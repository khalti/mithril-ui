# Workon in progress

# Fort test
- `$ git clone https://github.com/ludbek/mithril-ui.git`
- `$ cd mithril-ui`
- `$ jspm install`
- `$ npm install -g http-server`
- `$ http-server`
- visit localhost:8080/test

#Builds
## Modular, exclude dependencies
`$ jspm bundle-sfx index.js - mithril - lodash - velocity dist/components/selection.js --globals "{mithril:'m',lodash:'_'}" --global-name Selection`
## Single mega bundle
`$ jspm bundle-sfx index.js dist/sm.js --global-name sm`

