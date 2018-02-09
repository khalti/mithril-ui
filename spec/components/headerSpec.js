import {window, getVnode} from "./../utils.js";
import {Header} from "./../../src/components/header.js";
import {expect} from "chai";
import _ from "mithril";


describe("Header", () => {
	let header;

	beforeEach(() => {
		header = new Header();
	});

	it("complains if level is invalid.", () => {
		let vnode = {
			attrs: {level: 7 }
		};
		expect(header.oninit.bind(header, vnode)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'ui'.", () => {
			let vnode = getVnode();
			let classList = header.getClassList(vnode);
			expect(classList).to.contain("ui");
		});

		it("includes 'header'.", () => {
			let vnode = getVnode();
			let classList = header.getClassList(vnode);
			expect(classList).to.contain("header");
		});

		it("includes 'icon'.", () => {
			let vnode = getVnode();
			vnode.attrs.pyramid = true;
			let classList = header.getClassList(vnode);
			expect(classList).to.contain("icon");
		});

		it("includes 'disabled'.", () => {
			let vnode = getVnode();
			vnode.attrs.disabled = true;
			let classList = header.getClassList(vnode);
			expect(classList).to.contain("disabled");
		});

		it("includes 'dividing'.", () => {
			let vnode = getVnode();
			vnode.attrs.dividing = true;
			let classList = header.getClassList(vnode);
			expect(classList).to.contain("dividing");
		});

		it("includes 'block'.", () => {
			let vnode = getVnode();
			vnode.attrs.block = true;
			let classList = header.getClassList(vnode);
			expect(classList).to.contain("block");
		});

		it("includes proper attachment class.", () => {
			let vnode = getVnode();

			vnode.attrs.attach = true;
			let classList = header.getClassList(vnode);
			expect(classList).to.contain("attached");

			vnode.attrs.attach = "top";
			classList = header.getClassList(vnode);
			expect(classList).to.contain("top attached");
		});

		it("includes proper float.", () => {
			let vnode = getVnode();
			vnode.attrs.float = "left";
			let classList = header.getClassList(vnode);
			expect(classList).to.contain("left floated");
		});

		it("includes proper text aligment.", () => {
			let vnode = getVnode();
			vnode.attrs.textAlignment = "left";
			let classList = header.getClassList(vnode);
			expect(classList).to.contain("left aligned");
		});

		it("includes proper color.", () => {
			let vnode = getVnode();
			vnode.attrs.color = "red";
			let classList = header.getClassList(vnode);
			expect(classList).to.contain("red");
		});

		it("includes 'inverted'", () => {
			let vnode = getVnode();
			vnode.attrs.inverted = true;
			let classList = header.getClassList(vnode);
			expect(classList).to.contain("inverted");
		});
	});

	describe("view", () => {
		it("sets 'div' as root element if no level is specified.", () => {
			let vnode = getVnode();
			let vdom = header.view(vnode);
			expect(vdom.tag).to.equal('div');
		});

		it("sets root element to appropriate level.", () => {
			let vnode = getVnode();
			vnode.attrs = {level: 6};
			let vdom = header.view(vnode);
			expect(vdom.tag).to.equal("h6");
		});

		it("renders children", () => {
			let vnode = getVnode();
			vnode.children = [1,2,3];
			let vdom = header.view(vnode);

			expect(vdom.children[0].children).to.equal(1);
			expect(vdom.children[1].children).to.equal(2);
			expect(vdom.children[2].children).to.equal(3);
		});
	});

});
