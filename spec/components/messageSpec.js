import {message} from "./../../src/components/message.js";
import m from "mithril";
import {expect} from "chai";
import classnames from "classnames";


describe("message", () => {
	it("can be dismissed.", () => {
		let aMessage = m(message, {dismissable: true});
		let dismisser = aMessage.view(aMessage.controller()).children[0];
		dismisser.attrs.onclick({});

		let view = aMessage.view(aMessage.controller());
		expect(view.attrs.class).to.have.string("hidden");
	});

	it("complains on invalid attachment.", () => {
		let aMessage = m(message, {attach: "west"});
		expect(aMessage.view.bind(aMessage)).to.throw(Error);
	});

	it("complains on invalid type.", () => {
		let aMessage = m(message, {type: "good"});
		expect(aMessage.view.bind(aMessage)).to.throw(Error);
	});

	it("complains on invalid color.", () => {
		let aMessage = m(message, {type: "invisible"});
		expect(aMessage.view.bind(aMessage)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'ui'.", () => {
			let className = classnames(message.getClassList({}));
			expect(className).to.have.string("ui");
		});

		it("includes 'message'.", () => {
			let className = classnames(message.getClassList({}));
			expect(className).to.have.string("message");
		});

		it("includes 'icon'.", () => {
			let className = classnames(message.getClassList({icon: "anIcon"}));
			expect(className).to.have.string("icon");
		});

		it("includes proper state.", () => {
			var className = classnames(message.getClassList({state: "hidden"}));
			expect(className).to.have.string("hidden");

			className = classnames(message.getClassList({state: "visible"}));
			expect(className).to.have.string("visible");
		});

		it("includes 'floating'.", () => {
			let className = classnames(message.getClassList({floating: true}));
			expect(className).to.have.string("floating");
		});

		it("includes 'compact'.", () => {
			let className = classnames(message.getClassList({compact: true}));
			expect(className).to.have.string("compact");
		});

		it("includes proper attachment", () => {
			var className = classnames(message.getClassList({attach: true}));
			expect(className).to.have.string("attached");

			className = classnames(message.getClassList({attach: "top"}));
			expect(className).to.have.string("top");

			//TODO: test other attachments
		});

		it("includes proper types.", () => {
			let className = classnames(message.getClassList({type: "warning"}));
			expect(className).to.have.string("warning");

			//TODO: test other types
		});

		it("includes proper color.", () => {
			let className = classnames(message.getClassList({color: "blue"}));
			expect(className).to.have.string("blue");

			//TODO: test other color
		});

		it("includes proper size.", () => {
			let className = classnames(message.getClassList({size: "tiny"}));
			expect(className).to.have.string("tiny");

			//TODO: test other tiny
		});
	});

	describe("view", () => {
		it("renders children", () => {
			let aMessage = message.view(message.controller(), 1, 2);
			expect(aMessage.children[0]).to.equal(1);
			expect(aMessage.children[1]).to.equal(2);
		});

		it("renders icon and content.", () => {
			let attrs = {icon: "icon", content: "content"};
			let aMessage = message.view(message.controller(attrs), attrs);
			expect(aMessage.children[0]).to.equal("icon");
			expect(aMessage.children[1]).to.equal("content");
		});

		it("renders dismiss icon.", () => {
			let attrs = {dismissable: true};
			let aMessage = message.view(message.controller(attrs), attrs);
			expect(aMessage.children[0].attrs.className).to.equal("close icon");
		});
	});
});
