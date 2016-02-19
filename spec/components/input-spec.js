"use strict";

import Input from "../../components/input.js";
import m from 'mithril';

describe('components/input', () => {
  let attrs = {
    class: 'aClass',
    prepend: 'aPrepend',
    append: 'aAppend',
    onclick: 'aCallabck',
    type: 'hidden'}

  let aInput = m.component(Input, attrs);
  let aView = aInput.view();

  it("sets class of root 'div' to 'attrs.class'", () => {
    expect(aView.attrs.class).toEqual(attrs.class);});

  it("prepend 'attrs.prepend' before input element", () => {
    expect(aView.children[0]).toEqual(attrs.prepend);});

  it("appends 'attrs.append' after input element", () => {
    expect(aView.children[2]).toEqual(attrs.append);});

  it("passes rest of the attributes to input element", () => {
    let inputAttrs = aView.children[1].attrs;
    expect(inputAttrs).toEqual({onclick: attrs.onclick, type: 'hidden', class: 'hidden'});});

  it("changes class of <input> element to 'hidden' if 'attrs.type' is 'hidden'", () => {
    let inputAttrs = aView.children[1].attrs;
    expect(inputAttrs.class).toEqual(attrs.type)});});