require 'date'
require 'json'
require 'nokogiri'
require 'uri'
require 'yaml'

root = File.expand_path('..', __dir__)
build = File.join(root, '_site')
config = YAML.safe_load(File.read(File.join(root, '_config.yml')), aliases: true)
profiles = config.fetch('social').fetch('links')
hosts = profiles.map { |url| URI(url).host }
required_hosts = %w[orcid.org www.linkedin.com scholar.google.com opus.ece.ucsb.edu]
abort 'Missing or duplicated identity profiles' unless profiles.uniq == profiles && (required_hosts - hosts).empty?
abort 'Identity profiles must use HTTPS' unless profiles.all? { |url| URI(url).scheme == 'https' }

# Match the sitemap against the actual canonical source documents, including any
# future real posts/projects. Redirects and unpublished documents are excluded.
expected = {}
%w[_pages _publications _teaching _portfolio _talks _posts].each do |folder|
  Dir[File.join(root, folder, '*.{md,html}')].sort.each do |source|
    front = File.read(source).match(/\A---\s*\n(.*?)\n---/m)
    next unless front
    data = YAML.safe_load(front[1], permitted_classes: [Date, Time], aliases: true)
    next if data['sitemap'] == false || data['redirect_to'] || data['published'] == false
    next if config['future'] != true && data['date'] && DateTime.parse(data['date'].to_s) > DateTime.now
    abort "Missing canonical permalink: #{source}" unless data['permalink']
    abort "Missing explicit page-update date: #{source}" unless data['last_modified_at']
    url = URI.join(config.fetch('url') + '/', data['permalink']).to_s
    abort "Duplicate source URL: #{url}" if expected.key?(url)
    expected[url] = DateTime.iso8601(data['last_modified_at'].to_s)
  end
end

xml = Nokogiri::XML(File.read(File.join(build, 'sitemap.xml'))) { |options| options.strict.nonet }
namespace = { 's' => 'http://www.sitemaps.org/schemas/sitemap/0.9' }
entries = xml.xpath('/s:urlset/s:url', namespace)
urls = entries.map { |entry| entry.at_xpath('s:loc', namespace).text }
abort 'Duplicate sitemap URLs' unless urls == urls.uniq
abort 'Sitemap does not match canonical source pages' unless urls.sort == expected.keys.sort

entries.each do |entry|
  url = entry.at_xpath('s:loc', namespace).text
  date = DateTime.iso8601(entry.at_xpath('s:lastmod', namespace).text)
  abort "Incorrect or future lastmod: #{url}" unless date == expected.fetch(url) && date <= DateTime.now

  relative = URI(url).path.delete_prefix('/')
  relative += 'index.html' if relative.empty? || relative.end_with?('/')
  page = Nokogiri::HTML(File.read(File.join(build, relative)))
  identities = page.css('script[type="application/ld+json"]').map { |script| JSON.parse(script.text) }
  people = identities.select { |identity| identity['@type'] == 'Person' }
  correct = people.length == 1 && people.first['sameAs'] == profiles && people.first['name'] == config['name']
  abort "Incorrect Person metadata: #{url}" unless correct
end

verification = 'googled5dfc114a3b75210.html'
abort 'Ownership verification file changed' unless File.binread(File.join(root, verification)) == File.binread(File.join(build, verification))
abort 'Sample PDFs still published' unless Dir[File.join(build, 'files', '{paper,slides}[123].pdf')].empty?
abort 'Template content still published' unless %w[posts markdown non-menu-page talkmap markdown_generator terms].none? { |path| File.exist?(File.join(build, path)) }

puts "PASS: #{urls.length} unique canonical URLs, accurate explicit lastmod dates, four identity profiles, and unchanged verification file."
