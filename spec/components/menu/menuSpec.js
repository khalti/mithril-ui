import {menu} from "./../../../src/components/menu/menu.js";
import {expect} from "chai";
import classnames from "classnames";
import m from "mithril";


describe("menu", () => {
	it("complains if state is invalid.", () => {
		let vdom = m(menu, {state: "invalid"});
		expect(vdom.view.bind(vdom)).to.throw(Error);
	});

	it("complains if position to fix is invalid.", () => {
		let vdom = m(menu, {fixed: "somewhere"});
		expect(vdom.view.bind(vdom)).to.throw(Error);
	});

	it("complains if color is invalid.", () => {
		let vdom = m(menu, {color: "transparent"});
		expect(vdom.view.bind(vdom)).to.throw(Error);
	});

	it("complains if item count is invalid.", () => {
		let vdom = m(menu, {itemCount: 17});
		expect(vdom.view.bind(vdom)).to.throw(Error);
	});

	it("complains if attachment is invalid.", () => {
		let vdom = m(menu, {attach: "somewhere"});
		expect(vdom.view.bind(vdom)).to.throw(Error);
	});

	it("complains if size is invalid.", () => {
		let vdom = m(menu, {size: "extra large"});
		expect(vdom.view.bind(vdom)).to.throw(Error);
	});

	it("complains if 'fitted' is invalid.", () => {
		let vdom = m(menu, {fitted: "none"});
		expect(vdom.view.bind(vdom)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'ui'", () => {
			let className = classnames(menu.getClassList({}));
			expect(className).to.have.string("ui");
		});

		it("includes 'menu'", () => {
			let className = classnames(menu.getClassList({}));
			expect(className).to.have.string("menu");
		});

		it("includes 'secondary'", () => {
			let className = classnames(menu.getClassList({secondary: true}));
			expect(className).to.have.string("secondary");
		});

		it("includes 'pointing'", () => {
			let className = classnames(menu.getClassList({pointing: true}));
			expect(className).to.have.string("pointing");
		});

		it("includes 'tabular'", () => {
			let className = classnames(menu.getClassList({tabular: true}));
			expect(className).to.have.string("tabular");
		});

		it("includes 'text'", () => {
			let className = classnames(menu.getClassList({text: true}));
			expect(className).to.have.string("text");
		});

		it("includes 'vertical'", () => {
			let className = classnames(menu.getClassList({vertical: true}));
			expect(className).to.have.string("vertical");
		});

		it("includes 'pagination'", () => {
			let className = classnames(menu.getClassList({pagination: true}));
			expect(className).to.have.string("pagination");
		});

		it("includes proper state.", () => {
			let className = classnames(menu.getClassList({state: "active"}));
			expect(className).to.have.string("active");
		});

		it("includes proper 'fixed'.", () => {
			let className = classnames(menu.getClassList({fixed: "top"}));
			expect(className).to.have.string("top fixed");
		});

		it("includes 'inverted'.", () => {
			let className = classnames(menu.getClassList({inverted: true}));
			expect(className).to.have.string("inverted");
		});

		it("includes proper color.", () => {
			let className = classnames(menu.getClassList({color: "red"}));
			expect(className).to.have.string("red");
		});

		it("includes 'fluid'.", () => {
			let className = classnames(menu.getClassList({fluid: true}));
			expect(className).to.have.string("fluid");
		});

		it("includes 'compact'.", () => {
			let className = classnames(menu.getClassList({compact: true}));
			expect(className).to.have.string("compact");
		});

		it("includes proper item count.", () => {
			let className = classnames(menu.getClassList({itemCount: 2}));
			expect(className).to.have.string("two");
		});

		it("includes proper attachment.", () => {
			let className = classnames(menu.getClassList({attach: "top"}));
			expect(className).to.have.string("top attached");
		});

		it("includes proper size.", () => {
			let className = classnames(menu.getClassList({size: "mini"}));
			expect(className).to.have.string("mini");
		});

		it("includes proper value for 'fitted'.", () => {
			let className = classnames(menu.getClassList({fitted: "vertically"}));
			expect(className).to.have.string("fitted vertically");
		});

		it("includes 'borderless'.", () => {
			let className = classnames(menu.getClassList({borderless: true}));
			expect(className).to.have.string("borderless");
		});

		it("includes 'icon'.", () => {
			let className = classnames(menu.getClassList({icon: true}));
			expect(className).to.have.string("icon");
		});

		it("includes 'labeled icon'.", () => {
			let className = classnames(menu.getClassList({labeledIcon: true}));
			expect(className).to.have.string("labeled icon");
		});

		it("includes proper float.", () => {
			let className = classnames(menu.getClassList({float: "right"}));
			expect(className).to.have.string("right floated");
		});
	});
});
