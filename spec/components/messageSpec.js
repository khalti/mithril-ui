import {window, getVnode} from "./../utils.js";
import {Message, MessageContent} from "./../../src/components/message.js";
import _ from "mithril";
import {expect} from "chai";
import classnames from "classnames";
import {Icon} from "./../../src/components/icon/icon.js";


describe("Message", () => {
	let vnode, message;

	beforeEach(() => {
		message = new Message();
		vnode = getVnode();
	});

	it("complains on invalid attachment.", () => {
		vnode.attrs = {attach: "west"};
		expect(message.oninit.bind(vnode, vnode)).to.throw(Error);
	});

	it("complains on invalid type.", () => {
		vnode.attrs = {type: "good"};
		expect(message.oninit.bind(vnode, vnode)).to.throw(Error);
	});

	it("complains on invalid color.", () => {
		vnode.attrs = {type: "invisible"};
		expect(message.oninit.bind(vnode, vnode)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'ui'.", () => {
			expect(message.getClassList(vnode)).to.contain("ui");
		});

		it("includes 'message'.", () => {
			expect(message.getClassList(vnode)).to.contain("message");
		});

		it("includes 'icon'.", () => {
			vnode.children = _(Icon, {name: "add"});
			expect(message.getClassList(vnode)).to.contain("icon");
		});

		it("includes proper state.", () => {
			vnode.attrs = {state: "hidden"};
			expect(message.getClassList(vnode)).to.contain("hidden");

			vnode.attrs = {state: "visible"};
			expect(message.getClassList(vnode)).to.contain("visible");
		});

		it("includes 'floating'.", () => {
			vnode.attrs = {floating: true};
			expect(message.getClassList(vnode)).to.contain("floating");
		});

		it("includes 'compact'.", () => {
			vnode.attrs = {compact: true};
			expect(message.getClassList(vnode)).to.contain("compact");
		});

		it("includes proper attachment", () => {
			vnode.attrs = {attach: true};
			expect(message.getClassList(vnode)).to.contain("attached");

			vnode.attrs = {attach: "top"};
			expect(message.getClassList(vnode)).to.contain("top attached");

			//TODO: test other attachments
		});

		it("includes proper types.", () => {
			vnode.attrs = {type: "warning"};
			expect(message.getClassList(vnode)).to.contain("warning");

			//TODO: test other types
		});

		it("includes proper color.", () => {
			vnode.attrs = {color: "blue"};
			expect(message.getClassList(vnode)).to.contain("blue");

			//TODO: test other color
		});

		it("includes proper size.", () => {
			vnode.attrs = {size: "tiny"};
			expect(message.getClassList(vnode)).to.contain("tiny");

			//TODO: test other tiny
		});
	});

	describe("view", () => {
		it("renders icon and content.", () => {
			let aIcon = _(Icon, {name: "add"});
			let aContent = _(MessageContent, "yolo");
			vnode.children = [aIcon, aContent];
			let vdom = message.view(vnode);
			expect(vdom.children[0]).to.equal(aIcon);
			expect(vdom.children[1]).to.equal(aContent);
		});

		it("renders dismiss icon.", () => {
			vnode.attrs = {onDismiss: () => {}, content: "something"};
			let aMessage = message.view(vnode);
			expect(aMessage.children[0].tag).to.equal(Icon);
		});

		it("calls 'onDismisss' callback.", () => {
			let check;
			vnode.attrs = {onDismiss: () => {check = true;}, content: "something"};
			let aMessage = message.view(vnode);
			aMessage.children[0].attrs.onclick();
			expect(check).to.equal(true);
		});
	});
});
