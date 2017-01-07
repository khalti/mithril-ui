import {window} from "./../../utils.js";
import {icon} from "./../../../src/components/icon/icon.js";
import {expect} from "chai";
import _ from "mithril";


describe("icon", () => {
	describe("getDefaultAttrs", () => {
		it("sets root to 'i'", () => {
			expect(icon.getDefaultAttrs({attrs: {}}).root).to.equal("i");
		});
	});

	describe("getClassList", () => {
		let vnode;

		beforeEach(() => {
			vnode = {
				attrs: {},
				children: [],
				state: {}
			}
		});

		it("includes icon name", () => {
			vnode.attrs.name = "icon name";
			let classList = icon.getClassList(vnode);
			expect(classList).to.contain("icon name");
		});

		it("includes 'fitted'", () => {
			vnode.attrs.fitted = true;
			let classList = icon.getClassList(vnode);
			expect(classList).to.contain("fitted");
		});

		it("includes proper size", () => {
			vnode.attrs.size = "small";
			let classList = icon.getClassList(vnode);
			expect(classList).to.contain("small");
		});

		it("includes proper state", () => {
			vnode.attrs.state = "loading";
			let classList = icon.getClassList(vnode);
			expect(classList).to.contain("loading");
		});

		it("includes 'link'", () => {
			vnode.attrs.link = true;
			let classList = icon.getClassList(vnode);
			expect(classList).to.contain("link");
		});

		it("includes proper flip", () => {
			vnode.attrs.flip = "horizontally";
			let classList = icon.getClassList(vnode);
			expect(classList).to.contain("horizontally flipped");
		});

		it("includes proper rotate", () => {
			vnode.attrs.rotate = "clockwise";
			let classList = icon.getClassList(vnode);
			expect(classList).to.contain("clockwise rotated");
		});

		it("includes 'circular'", () => {
			vnode.attrs.circular = true;
			let classList = icon.getClassList(vnode);
			expect(classList).to.contain("circular");
		});

		it("includes 'bordered'", () => {
			vnode.attrs.bordered = true;
			let classList = icon.getClassList(vnode);
			expect(classList).to.contain("bordered");
		});

		it("includes proper color", () => {
			vnode.attrs.color = "red";
			let classList = icon.getClassList(vnode);
			expect(classList).to.contain("red");
		});

		it("includes 'inverted'", () => {
			vnode.attrs.inverted = true;
			let classList = icon.getClassList(vnode);
			expect(classList).to.contain("inverted");
		});

		it("includes 'corner'", () => {
			vnode.attrs.corner = true;
			let classList = icon.getClassList(vnode);
			expect(classList).to.contain("corner");
		});
	});
});
