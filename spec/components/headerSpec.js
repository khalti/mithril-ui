import {header} from "./../../src/components/header.js";
import {expect} from "chai";
import m from "mithril";
import classnames from "classnames";


describe("header", () => {
	it("complains if level is invalid.", () => {
		let aHeader = m(header, {level: 7});
		expect(aHeader.view.bind(aHeader)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'ui'.", () => {
			let className = classnames(header.getClassList({}));
			expect(className).to.have.string("ui");
		});

		it("includes 'header'.", () => {
			let className = classnames(header.getClassList({}));
			expect(className).to.have.string("header");
		});

		it("includes 'icon'.", () => {
			let className = classnames(header.getClassList({pyramid: true}));
			expect(className).to.have.string("icon");
		});

		it("includes 'disabled'.", () => {
			let className = classnames(header.getClassList({disabled: true}));
			expect(className).to.have.string("disabled");
		});

		it("includes 'dividing'.", () => {
			let className = classnames(header.getClassList({dividing: true}));
			expect(className).to.have.string("dividing");
		});

		it("includes 'block'.", () => {
			let className = classnames(header.getClassList({block: true}));
			expect(className).to.have.string("block");
		});

		it("includes proper attachment class.", () => {
			var className = classnames(header.getClassList({attach: true}));
			expect(className).to.have.string("attached");

			className = classnames(header.getClassList({attach: "top"}));
			expect(className).to.have.string("top attached");
		});

		it("includes proper float.", () => {
			let className = classnames(header.getClassList({float: "left"}));
			expect(className).to.have.string("left floated");
		});

		it("includes proper text aligment.", () => {
			let className = classnames(header.getClassList({textAligment: "left"}));
			expect(className).to.have.string("left aligned");
		});

		it("includes proper color.", () => {
			let className = classnames(header.getClassList({color: "red"}));
			expect(className).to.have.string("red");
		});

		it("includes proper color.", () => {
			let className = classnames(header.getClassList({inverted: true}));
			expect(className).to.have.string("inverted");
		});
	});

	describe("view", () => {
		it("sets 'div' as root element if no level is specified.", () => {
			let aHeader = m(header);
			let rootElement = aHeader.view();
			expect(rootElement.tag).to.equal('div');
		});

		it("sets root element to appropriate level.", () => {
			let dom = m(header, {level: 6}).view();
			expect(dom.tag).to.equal("h6");
		});

		it("renders children", () => {
			let dom = m(header, 1, 2, 3).view();

			expect(dom.children[0]).to.equal(1);
			expect(dom.children[1]).to.equal(2);
			expect(dom.children[2]).to.equal(3);
		});
	});

});
