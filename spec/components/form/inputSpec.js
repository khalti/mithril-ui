import {input} from "./../../../src/components/form/input.js";
import m from 'mithril';
import chai from "chai";
import classnames from "classnames";
import {getVdom} from "./../../utils.js";
import {icon} from "./../../../src/components/icon.js";
import {label} from "./../../../src/components/label.js";
import {button} from "./../../../src/components/button/button.js";


let expect = chai.expect;

let getClass = (attrs) => {
	return classnames(input.getClassList(attrs));
};

describe("input", () => {
	describe(".view", () => {
		let attrs, vdom;

		beforeEach(() => {
			attrs = {
				prepend: icon,
				append: icon,
				onclick: "aCallabck",
				type: "hidden",
				name: "aName"
			};
			vdom = getVdom(m(input, attrs));
		});

		it("includes name", () => {
			let inputDom = vdom.children[1];
			expect(inputDom.attrs.name).to.equal(attrs.name);
		});

		it("'s root dom is a div", () => {
			expect(vdom.tag).to.equal("div");
		});

		it("it appends", function () {
			expect(vdom.children[2]).to.exist;
		});

		it("it prepends", function () {
			expect(vdom.children[0]).to.exist;
		});

		it("'s root element has 'ui' and 'input' in its class", () => {
			expect(vdom.attrs.class).to.have.string("ui");
			expect(vdom.attrs.class).to.have.string("input");
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

    it("returns '.ui.right.icon.input' if an icon is being appended", () => {
      var attrs = {append: icon};
      expect(getClass(attrs)).to.equal("ui right icon input");
    });

    it("returns '.ui.left.icon.input' if an icon is being prepended", () => {
      var attrs = {prepend: icon};
      expect(getClass(attrs)).to.equal("ui left icon input");
    });

    it("returns '.ui.left.right.icon.input' if input is surrounded by icons", () => {
      var attrs = {prepend: icon, append: icon};
      expect(getClass(attrs)).to.equal("ui left right icon input");
    });

    it("returns '.ui.left.labeled.input' if a label is being prepended", () => {
      var attrs = {prepend: label};
      expect(getClass(attrs)).to.equal("ui left labeled input");
    });

    it("returns '.ui.right.labeled.input' if a label is being appended", () => {
      var attrs = {append: label};
      expect(getClass(attrs)).to.equal("ui right labeled input");
    });

    it("returns '.ui.left.right.labeled.input'", () => {
      var attrs = {prepend: label, append: label};
      expect(getClass(attrs)).to.equal("ui left right labeled input");
    });

    it("returns '.ui.left.action.input'", () => {
      var attrs = {prepend: button};
      expect(getClass(attrs)).to.equal("ui left action input");
    });

    it("returns '.ui.right.labeled.input'", () => {
      var attrs = {append: button};
      expect(getClass(attrs)).to.equal("ui right action input");
    });

    it("returns '.ui.left.right.labeled.input'", () => {
      var attrs = {prepend: button, append: button};
      expect(getClass(attrs)).to.equal("ui left right action input");
    });

		it("includes 'fluid'", () => {
			expect(getClass({fluid: true})).to.have.string("fluid");
		});
  });
});
