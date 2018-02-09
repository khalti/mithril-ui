import {window, getVnode} from "./../../utils.js";
import {Menu} from "./../../../src/components/menu/menu.js";
import {expect} from "chai";
import _ from "mithril";


describe("menu", () => {
	let menu;

	beforeEach(() => {
		menu = new Menu();
	});

	it("complains if state is invalid.", () => {
		let vnode = getVnode();
		vnode.attrs = {state: "invalid"};
		expect(menu.oninit.bind(menu, vnode)).to.throw(Error);
	});

	it("complains if position to fix is invalid.", () => {
		let vnode = getVnode();
		vnode.attrs = {fixed: "somewhere"};
		expect(menu.oninit.bind(menu, vnode)).to.throw(Error);
	});

	it("complains if color is invalid.", () => {
		let vnode = getVnode();
		vnode.attrs = {color: "transparent"};
		expect(menu.oninit.bind(menu, vnode)).to.throw(Error);
	});

	it("complains if item count is invalid.", () => {
		let vnode = getVnode();
		vnode.attrs = {itemCount: 17};
		expect(menu.oninit.bind(menu, vnode)).to.throw(Error);
	});

	it("complains if attachment is invalid.", () => {
		let vnode = getVnode();
		vnode.attrs = {attach: "somewhere"};
		expect(menu.oninit.bind(menu, vnode)).to.throw(Error);
	});

	it("complains if size is invalid.", () => {
		let vnode = getVnode();
		vnode.attrs = {size: "extra large"};
		expect(menu.oninit.bind(menu, vnode)).to.throw(Error);
	});

	it("complains if 'fitted' is invalid.", () => {
		let vnode = getVnode();
		vnode.attrs = {fitted: "none"};
		expect(menu.oninit.bind(menu, vnode)).to.throw(Error);
	});

	describe("getClassList", () => {
		let vnode;

		beforeEach(() => {
			vnode = getVnode();
		});

		it("includes 'ui'", () => {
			let classList = menu.getClassList(vnode);
			expect(classList).to.contain("ui");
		});

		it("includes 'menu'", () => {
			let classList = menu.getClassList(vnode);
			expect(classList).to.contain("menu");
		});

		it("includes 'secondary'", () => {
			vnode.attrs = {secondary: true};
			expect(menu.getClassList(vnode)).to.contain("secondary");
		});

		it("includes 'pointing'", () => {
			vnode.attrs = {pointing: true};
			expect(menu.getClassList(vnode)).to.contain("pointing");
		});

		it("includes 'tabular'", () => {
			vnode.attrs = {tabular: true};
			expect(menu.getClassList(vnode)).to.contain("tabular");
		});

		it("includes 'text'", () => {
			vnode.attrs = {text: true};
			expect(menu.getClassList(vnode)).to.contain("text");
		});

		it("includes 'vertical'", () => {
			vnode.attrs = {vertical: true};
			expect(menu.getClassList(vnode)).to.contain("vertical");
		});

		it("includes 'pagination'", () => {
			vnode.attrs = {pagination: true};
			expect(menu.getClassList(vnode)).to.contain("pagination");
		});

		it("includes proper state.", () => {
			vnode.attrs = {state: "active"};
			expect(menu.getClassList(vnode)).to.contain("active");
		});

		it("includes proper 'fixed'.", () => {
			vnode.attrs = {fixed: "top"};
			expect(menu.getClassList(vnode)).to.contain("top fixed");
		});

		it("includes 'inverted'.", () => {
			vnode.attrs = {inverted: true};
			expect(menu.getClassList(vnode)).to.contain("inverted");
		});

		it("includes proper color.", () => {
			vnode.attrs = {color: "red"};
			expect(menu.getClassList(vnode)).to.contain("red");
		});

		it("includes 'fluid'.", () => {
			vnode.attrs = {fluid: true};
			expect(menu.getClassList(vnode)).to.contain("fluid");
		});

		it("includes 'compact'.", () => {
			vnode.attrs = {compact: true};
			expect(menu.getClassList(vnode)).to.contain("compact");
		});

		it("includes proper item count.", () => {
			vnode.attrs = {itemCount: 2};
			expect(menu.getClassList(vnode)).to.contain("two item");
		});

		it("includes proper attachment.", () => {
			vnode.attrs = {attach: "top"};
			expect(menu.getClassList(vnode)).to.contain("top attached");
		});

		it("includes proper size.", () => {
			vnode.attrs = {size: "mini"};
			expect(menu.getClassList(vnode)).to.contain("mini");
		});

		it("includes proper value for 'fitted'.", () => {
			vnode.attrs = {fitted: "vertically"};
			expect(menu.getClassList(vnode)).to.contain("fitted vertically");
		});

		it("includes 'borderless'.", () => {
			vnode.attrs = {borderless: true};
			expect(menu.getClassList(vnode)).to.contain("borderless");
		});

		it("includes 'icon'.", () => {
			vnode.attrs = {icon: true};
			expect(menu.getClassList(vnode)).to.contain("icon");
		});

		it("includes 'labeled icon'.", () => {
			vnode.attrs = {labeledIcon: true};
			expect(menu.getClassList(vnode)).to.contain("labeled icon");
		});

		it("includes proper float.", () => {
			vnode.attrs = {float: "right"};
			expect(menu.getClassList(vnode)).to.contain("right floated");
		});
	});
});
