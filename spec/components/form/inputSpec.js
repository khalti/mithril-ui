import {window} from "./../../utils.js";
import {Input} from "./../../../src/components/form/input.js";
import _ from 'mithril';
import chai from "chai";
import classnames from "classnames";
import {getVdom} from "./../../utils.js";
import {Icon} from "./../../../src/components/icon/icon.js";
import {Label} from "./../../../src/components/label.js";
import {Button} from "./../../../src/components/button/button.js";
import {expect} from "chai";


describe("input", () => {
	describe(".view", () => {
		let attrs, vdom;

		beforeEach(() => {
			attrs = {
				prepend: _(Icon, {name: "hill"}),
				append: _(Icon, {name: "mountain"}),
				onclick: "aCallabck",
				type: "hidden",
				name: "aName"
			};

			_.render(document.body, _(Input, attrs));
		});

		it("includes 'name'", () => {
			let inputDom = document.querySelector("input");
			expect(inputDom.name).to.equal(attrs.name);
		});

		it("'s root dom is a div", () => {
			let rootDom = document.body.childNodes[0];
			expect(rootDom.tagName).to.equal("DIV");
		});

		it("it appends", function () {
			let prependDom = document.body.childNodes[0].childNodes[0];
			expect(prependDom.tagName).to.equal("I");
		});

		it("it prepends", function () {
			let appendDom = document.body.childNodes[0].childNodes[2];
			expect(appendDom.tagName).to.equal("I");
		});

		it("'s root element has 'ui' and 'input' in its class", () => {
			let rootDom = document.body.childNodes[0];
			expect(rootDom.className).to.have.string("ui");
			expect(rootDom.className).to.have.string("input");
		});

		it("changes class of 'input' element to 'hidden' if 'attrs.type' is 'hidden'", () => {
			let inputDom = document.querySelector("input");
			expect(inputDom.className).to.have.string("hidden");
		});
	});

  describe(".getClassList",  () => {
		let vnode, input;

		beforeEach(() => {
			input = new Input();
			vnode = {
				attrs: {},
				children: [],
				state: {}
			};
		});

    it("returns '.ui.input' if there is nothing to prepend or append", () => {
			let classList = input.getClassList(vnode);
      expect(classList).to.contain("ui");
      expect(classList).to.contain("input");
    });

    it("includes 'right icon' if an icon is being appended", () => {
      vnode.attrs = {append: _(Icon, {name: "add"})};
			let classList = input.getClassList(vnode);
      expect(classList).to.contain("right icon");
    });

    it("includes 'left icon' if an icon is being prepended", () => {
      vnode.attrs = {prepend: _(Icon, {name: "remove"})};
			let classList = input.getClassList(vnode);
      expect(classList).to.contain("left icon");
    });

    it("returns 'left right icon' if input is surrounded by icons", () => {
      vnode.attrs = {prepend: _(Icon, {name: "aname"}), append: _(Icon, {name: "aname"})};
			let classList = input.getClassList(vnode);
      expect(classList).to.contain("left right icon");
    });

    it("returns 'left labeled' if a label is being prepended", () => {
      vnode.attrs = {prepend: _(Label)};
			let classList = input.getClassList(vnode);
      expect(classList).to.contain("left labeled");
    });

    it("returns 'right labeled' if a label is being appended", () => {
      vnode.attrs = {append: _(Label)};
			let classList = input.getClassList(vnode);
      expect(classList).to.contain("right labeled");
    });

    it("returns 'left right labeled'", () => {
      vnode.attrs = {prepend: _(Label), append: _(Label)};
			let classList = input.getClassList(vnode);
      expect(classList).to.contain("left right labeled");
    });

    it("returns 'left action'", () => {
      vnode.attrs = {prepend: _(Button)};
			let classList = input.getClassList(vnode);
      expect(classList).to.contain("left action");
    });

    it("returns 'right labeled'", () => {
      vnode.attrs = {append: _(Button)};
			let classList = input.getClassList(vnode);
      expect(classList).to.contain("right action");
    });

    it("returns 'left right action'", () => {
      vnode.attrs = {prepend: _(Button), append: _(Button)};
			let classList = input.getClassList(vnode);
      expect(classList).to.contain("left right action");
    });

		it("includes 'fluid'", () => {
      vnode.attrs = {fluid: true};
			let classList = input.getClassList(vnode);
			expect(classList).to.contain("fluid");
		});
  });
});
