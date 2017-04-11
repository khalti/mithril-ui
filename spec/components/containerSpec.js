import {window} from "./../utils.js";
import {Container} from "./../../src/components/container.js";
import {expect} from "chai";


describe("Container", () => {
	let vnode, container;

	beforeEach(() => {
		container = new Container();
		vnode = {
			attrs: {},
			children: [],
			state: {}
		};
	});

	describe(".getClassList", () => {
		it("includes 'ui'", () => {
			let classList = container.getClassList(vnode);
			expect(classList).to.contain("ui");
		});

		it("includes 'container'", () => {
			let classList = container.getClassList(vnode);
			expect(classList).to.contain("container");
		});

		it("should return proper type class", () => {
			vnode.attrs = {type: "text"};
			let classList = container.getClassList(vnode);
			expect(classList).to.contain("text");
		});

		it("should return proper text alignment class", () => {
			vnode.attrs.textAlignment = "center";
			let classList = container.getClassList(vnode);
			expect(classList).to.contain("center aligned");
		});
	});
});
