"use strict";

import Checkbox from "../../components/checkbox.js";
import m from 'mithril';

describe("components/checkbox", () => {
  let aCheckbox;
  let vdom;
  beforeEach(() => {
    aCheckbox = m.component(Checkbox, {
      onchange: 'aCallback',
      label: 'A label.'});
    vdom = aCheckbox.view().view();});

  it("sets class to .ui.checkbox", () => {
    expect(vdom.attrs.class).toEqual('ui checkbox');});

  it("sets input type to hidden", () => {
    let aInput = vdom.children[1];
    expect(aInput.attrs.type).toEqual('hidden');});

  it("creates <label> out of attrs.label", () => {
    let aLabel = vdom.children[2];
    expect(aLabel.children[0]).toEqual('A label.');})});
