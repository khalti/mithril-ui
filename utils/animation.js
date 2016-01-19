'use strict';

const m = require('mithril');
const _ = require('lodash');
const $ = require('jquery');


module.exports = {
  toggle(tag, attrs, children) {
    if (attrs.boolean !== false || attrs.boolean !== true) new Error('toggle requires a "attrs.boolean" field.');
    let value = attrs.boolean;

    let animate = function (el, initialized, ctx)  {
      let dom = $(tag);

      if(!initialized) {
        if (value) {
          dom.css('display', 'block');
          }
        else {
          dom.css('display', 'none');
          }
        ctx.state = value;
        }

      if (ctx.state === value) return;
      if (value) {
        let className = 'animation show';
        dom.css('display', 'block');
        dom.addClass(className)
          .one('animationend', () => {dom.removeClass(className);});
        }
      else {
        let className = 'animation hide';
        dom.addClass(className)
          .one('animationend', () => {dom.removeClass(className);dom.css('display', 'none');});
        }

      ctx.state = value;
      };

    // attach animate to attrs.config
    let originalConfig = attrs.config;
    attrs.config = function (el, initialized, ctx) {
      if (originalConfig) originalConfig(el, initialized, ctx);
      animate(el, initialized, ctx);
    };

    return m(tag, attrs, children);
    }
};