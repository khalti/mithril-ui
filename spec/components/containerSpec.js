import {window} from "./../utils.js";
import {container} from "./../../src/components/container.js";
import {expect} from "chai";


describe("container", () => {
	let vnode;

	beforeEach(() => {
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
