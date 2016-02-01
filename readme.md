# Workon in progress

# Fort test
- 1. clone this repo
- 2. jspm install

#Builds
## Modular, exclude dependencies
`$ jspm bundle-sfx index.js - mithril - lodash - velocity dist/components/selection.js --globals "{mithril:'m',lodash:'_'}" --global-name Selection`
## Single mega bundle
`$ jspm bundle-sfx index.js dist/sm.js --global-name sm`

