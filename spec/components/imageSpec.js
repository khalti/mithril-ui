import {window, getVnode} from "./../utils.js";
import {image} from "./../../src/components/image.js";
import {expect} from "chai";
import _ from "mithril";


describe("image", () => {
	it("complains if image source is not given", () => {
		expect(image.view.bind(image)).to.throw(Error);
	});

	describe("getDefaultAttrs", () => {
		it("includes 'src' if link is absent.", () => {
			let vnode = getVnode();
			vnode.attrs.src = "http://something.com"
			let attrs = image.getDefaultAttrs(vnode);
			expect(attrs.rootAttrs.src).to.equal("http://something.com");
		});

		it("includes 'href' if link is given.", () => {
			let vnode = getVnode();
			vnode.attrs.link = "http://somewhere.com";
			let attrs = image.getDefaultAttrs(vnode);
			expect(attrs.rootAttrs.href).to.equal("http://somewhere.com");
		});
	});

	describe("getClassList", () => {
		it("includes 'ui'.", () => {
			let vnode = getVnode();
			let classList = image.getClassList(vnode);
			expect(classList).to.contain("ui");
		});

		it("includes 'image'.", () => {
			let vnode = getVnode();
			let classList = image.getClassList(vnode);
			expect(classList).to.contain("image");
		});

		it("includes 'hidden'.", () => {
			let vnode = getVnode();
			vnode.attrs.hidden = true;
			let classList = image.getClassList(vnode);
			expect(classList).to.contain("hidden");
		});

		it("includes 'disabled'.", () => {
			let vnode = getVnode();
			vnode.attrs.disabled = true;
			let classList = image.getClassList(vnode);
			expect(classList).to.contain("disabled");
		});

		it("includes 'bordered'.", () => {
			let vnode = getVnode();
			vnode.attrs.bordered = true;
			let classList = image.getClassList(vnode);
			expect(classList).to.contain("bordered");
		});

		it("includes 'fluid'.", () => {
			let vnode = getVnode();
			vnode.attrs.fluid = true;
			let classList = image.getClassList(vnode);
			expect(classList).to.contain("fluid");
		});

		it("includes 'rounded'.", () => {
			let vnode = getVnode();
			vnode.attrs.rounded = true;
			let classList = image.getClassList(vnode);
			expect(classList).to.contain("rounded");
		});

		it("includes 'circular'.", () => {
			let vnode = getVnode();
			vnode.attrs.circular = true;
			let classList = image.getClassList(vnode);
			expect(classList).to.contain("circular");
		});

		it("includes vertical alignment.", () => {
			let vnode = getVnode();
			vnode.attrs.verticalAlignment = "middle";
			let classList = image.getClassList(vnode);
			expect(classList).to.contain("middle aligned");
		});

		it("includes 'centered'.", () => {
			let vnode = getVnode();
			vnode.attrs.centered = true;
			let classList = image.getClassList(vnode);
			expect(classList).to.contain("centered");
		});

		it("includes 'spaced'.", () => {
			let vnode = getVnode();
			vnode.attrs.spaced = true;
			let classList = image.getClassList(vnode);
			expect(classList).to.contain("spaced");
		});

		it("includes floats.", () => {
			let vnode = getVnode();
			vnode.attrs.float = "right";
			let classList = image.getClassList(vnode);
			expect(classList).to.contain("right floated");
		});

		it("includes sizes.", () => {
			let vnode = getVnode();
			vnode.attrs.size = "big";
			let classList = image.getClassList(vnode);
			expect(classList).to.contain("big");
		});
	});

	describe("view", () => {
		it("returns image if link is absent.", () => {
			let vnode = getVnode();
			vnode.attrs = {src: "http://something.com"};
			let vdom = image.view(vnode);
			expect(vdom.tag).to.equal('img');
		});

		it("returns anchor if link is present.", () => {
			let vnode = getVnode();
			vnode.attrs = {link: "http://somewhere.com", src: "http://something.com"};
			let vdom = image.view(vnode);
			expect(vdom.tag).to.equal('a');
		});
	});
});
