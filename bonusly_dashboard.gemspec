Gem::Specification.new do |s|
  s.name        = 'bonusly_dashboard'
  s.version     = '0.0.1'
  s.date        = '2016-05-27'
  s.summary     = 'Bonusly Dashboard'
  s.description = 'A simple dashboard for displaying recent Bonusly highlights'
  s.authors     = ['Aaron Davis']
  s.email       = 'aaron@bonus.ly'
  s.files       = `git ls-files -- app/*`.split("\n") + ['lib/bonusly_dashboard.rb']
  s.homepage    = 'https://bonus.ly'
  s.license     = 'MIT'
end