import {item} from "./../../../src/components/menu/item.js";
import classnames from "classnames";
import {expect} from "chai";
import m from "mithril";


describe("item", () => {
	it("complains if color is invalid.", () => {
		let vdom = m(item, {color: "transparent"});
		expect(vdom.view.bind(vdom)).to.throw(Error);
	});

	it("complains if 'fitted' is invalid.", () => {
		let vdom = m(item, {fitted: "none"});
		expect(vdom.view.bind(vdom)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'item'", () => {
			let className = classnames(item.getClassList({}));
			expect(className).to.have.string("item");
		});

		it("includes 'header'", () => {
			let className = classnames(item.getClassList({header: true}));
			expect(className).to.have.string("header");
		});

		it("includes proper 'color'.", () => {
			let className = classnames(item.getClassList({color: "red"}));
			expect(className).to.have.string("red");
		});

		it("includes proper value for 'fitted'.", () => {
			let className = classnames(item.getClassList({fitted: "vertically"}));
			expect(className).to.have.string("fitted vertically");
		});

		it("includes 'borderless'.", () => {
			let className = classnames(item.getClassList({borderless: true}));
			expect(className).to.have.string("borderless");
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets root to 'a' if 'href' is present", () => {
			let attrs = item.getDefaultAttrs({href: "/somewhere/"});
			expect(attrs.root).to.equal('a');
		});

		it("sets root to 'div' if 'href' is absent.", () => {
			let attrs = item.getDefaultAttrs({});
			expect(attrs.root).to.equal('div');
		});
	});
});
