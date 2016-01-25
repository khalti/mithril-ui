'use strict';

const m = require('mithril');
const _ = require('lodash');
const $ = require('jquery');

let noop = function () {};

let getVDOM = function (args) {
  return m.apply(m, args);
};

module.exports = {
  // toggle animation
  toggle() {
    let vdom = getVDOM(arguments);
    if (vdom.attrs._toggle !== false || vdom.attrs.boolean !== true) new Error('toggle requires a "attrs.boolean" field.');

    let value = vdom.attrs._toggle;

    let animate = function (el, initialized, ctx)  {
      let dom = $(el);

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
    let originalConfig = vdom.attrs.config;
    vdom.attrs.config = function (el, initialized, ctx) {
      if (originalConfig) originalConfig(el, initialized, ctx);
      animate(el, initialized, ctx);
    };

    return m(vdom.tag, vdom.attrs, vdom.children);
    },

  // ad animation
  ad() {
    let vdom = getVDOM(arguments);

    let animate = function (el, initialized, ctx)  {
      let dom = $(el);
      if (initialized) return;
      dom.addClass('animation enter')
        .one('animationend', () => dom.removeClass('animation enter'));
      };

    // attach animate to attrs.config
    let originalConfig = vdom.attrs.config;
    vdom.attrs.config = function (el, initialized, ctx) {
      if (originalConfig) originalConfig(el, initialized, ctx);
      animate(el, initialized, ctx);
    };

    return m(vdom.tag, vdom.attrs, vdom.children);
    },

  // add, remove, move and change animation
  map(data, callback) {
    if (!(data && callback)) new Error('map needs at least two arguments.');

    let elements = _.map(data, callback);
    // armc animator
    let armc = function (index, data, config) {
      return function (el, initialized, ctx) {
        let dom = $(el);
        let addClass = 'animation add';
        let changeClass = 'animation change';

        // execute original config
        if (config) config(el, initialized, ctx);

        // for addition of element
        if(!initialized) {
          dom.addClass(addClass)
            .one('animationend', () => dom.removeClass(addClass));
        }
        // for element move
        if ((ctx.index || ctx.index === 0) && ctx.index < index) {
          dom.addClass('animation move low')
            .one('animationend', () => dom.removeClass('animation move low'));
        }
        else if ((ctx.index || ctx.index === 0) && ctx.index > index) {
          dom.addClass('animation move high')
            .one('animationend', () => dom.removeClass('animation move high'));
        }
        // if change in data
        if (ctx.data && !_.isEqual(ctx.data, data)) {
          dom.addClass(changeClass)
            .one('animationend', () => dom.removeClass(changeClass));
        }
        // save state
        ctx.data = _.clone(data, true);
        ctx.index = index;
      };
    };

    // attach animation to elements
    return _.map(_.range(data.length), (index) => {
      let delement = elements[index], ddata = data[index];
      let originalConfig = delement.attrs.config;

      delement.attrs.key = ddata.id || ddata;
      delement.attrs.config = armc(index, ddata, originalConfig);

      return delement;
    });
  }
};