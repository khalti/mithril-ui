import {input} from "../../src/components/input.js";
import m from 'mithril';
import chai from "chai";
import classnames from "classnames";

let expect = chai.expect;

let $ = (vdom) => {
	if (vdom.view) {
		return vdom.view();
	}
	return vdom;
};

let getClass = (attrs) => {
	return classnames(input.getClassList(attrs));
};


describe("input", () => {
	describe(".view", () => {
		let attrs, vdom;

		beforeEach(() => {
			attrs = {
				prepend: 'aPrepend',
				append: 'aAppend',
				onclick: 'aCallabck',
				type: 'hidden'
			};
			vdom = $(m(input, attrs));
		});

		it("'s root dom is a div", () => {
			expect(vdom.tag).to.equal('div');
		});

		it("it appends", function () {
			expect(vdom.children[2]).to.equal(attrs.append);
		});

		it("it prepends", function () {
			expect(vdom.children[0]).to.equal(attrs.prepend);
		});

		it("'s root element has 'ui' and 'input' in its class", () => {
			expect(vdom.attrs.className).to.have.string('ui');
			expect(vdom.attrs.className).to.have.string('input');
		});

		it("changes class of 'input' element to 'hidden' if 'attrs.type' is 'hidden'", () => {
			expect(vdom.children[1]);
		});
	});

  describe(".getClass",  () => {
    it("returns '.ui.input' if there is nothing to prepend or append", () => {
      let attrs = {};
      expect(getClass(attrs)).to.equal("ui input");
    });

    it("returns '.ui.icon.input' if an icon is being appended", () => {
      var attrs = {append: m("i")};
      expect(getClass(attrs)).to.equal("ui icon input");
    });

    it("returns '.ui.left.icon.input' if an icon is being prepended", () => {
      var attrs = {prepend: m("i")};
      expect(getClass(attrs)).to.equal("ui left icon input");
    });

    it("returns '.ui.labeled.input' if a label is being prepended", () => {
      var attrs = {prepend: m("div")};
      expect(getClass(attrs)).to.equal("ui labeled input");
    });

    it("returns '.ui.right.labeled.input' if a label is being appended", () => {
      var attrs = {append: m("div")};
      expect(getClass(attrs)).to.equal("ui right labeled input");
    });

    it("returns '.ui.labeled.icon.input' if a label is being prepended and icon is being appended", ()  => {
      var attrs = {prepend: m("div"), append: m("i")};
      expect(getClass(attrs)).to.equal("ui icon labeled input");
    });

    it("returns '.ui.left.icon.right.labeled.input' if an icon is being prepended and a label is being appended", () => {
      var attrs = {prepend: m("i"), append: m("div")};
      expect(getClass(attrs)).to.equal("ui left icon right labeled input");
    });
  });
});
