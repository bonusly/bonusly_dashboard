Gem::Specification.new do |s|
  s.name        = 'bonusly_dashboard'
  s.version     = '0.1.36'
  s.date        = '2017-09-01'
  s.summary     = 'Bonusly Dashboard'
  s.description = 'A simple dashboard for displaying recent Bonusly highlights'
  s.authors     = ['Aaron Davis', 'Robert Ingrum']
  s.email       = 'aaron@bonus.ly'
  s.files       = Dir['{app,config,lib,vendor}/**/*', 'MIT-LICENSE', 'README.md']
  s.homepage    = 'https://bonus.ly'
  s.license     = 'MIT'
  s.add_runtime_dependency 'font-awesome-sass', ['>= 4.6.2']
  s.add_runtime_dependency 'secure_headers'
  s.require_paths = ['lib']
end
