Self Executing Package
  Modular, exclude dependencies
    $ jspm bundle-sfx index.js - mithril - lodash - velocity dist/components/selection.js --globals "{mithril:'m',lodash:'_'}" --global-name Selection
  Single mega bundle
    $ jspm bundle-sfx index.js dist/sm.js --global-name sm

