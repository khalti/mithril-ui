import m from "mithril";
import _ from "lodash";
import Input from "./input.js";

export default {
  view: function (ctrl, attrs) {
    attrs.class = 'ui checkbox';
    attrs.type = 'hidden';
    attrs.append = m('label', attrs.label);
    return m.component(Input, attrs);}}
