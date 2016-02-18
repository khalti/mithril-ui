"use strict";

import Input from "../../components/input.js";
import m from 'mithril';

describe('components/input', () => {
  let attrs = {
    class: 'aClass',
    prepend: 'aPrepend',
    append: 'aAppend',
    onclick: 'aCallabck'
    }

  let aInput = m.component(Input, attrs);
  let aView = aInput.view();

  it("sets class of root 'div' to 'attrs.class'", () => {
    expect(aView.attrs.class).toEqual(attrs.class);
    });

  it("prepend 'attrs.prepend' before input element", () => {
    expect(aView.children[0].tag).toEqual(attrs.prepend);
    });

  it("appends 'attrs.append' after input element", () => {
    expect(aView.children[2].tag).toEqual(attrs.append);
    });

  it("passes rest of the attributes to input element", () => {
    let inputAttrs = aView.children[1].attrs;
    expect(inputAttrs).toEqual({onclick: attrs.onclick});
    });

  });