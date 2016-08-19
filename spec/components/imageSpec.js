import {image} from "./../../src/components/image.js";
import {expect} from "chai";
import m from "mithril";
import classnames from "classnames";


describe("image", () => {
	it("complains if image source is not given", () => {
		expect(image.view.bind(image)).to.throw(Error);
	});

	describe("getDefaultAttrs", () => {
		it("includes 'src' if link is absent.", () => {
			let attrs = image.getDefaultAttrs({src: "http://something.com"});
			expect(attrs.rootAttrs.src).to.equal("http://something.com");
		});

		it("includes 'href' if link is given.", () => {
			let attrs = image.getDefaultAttrs({link: "http://somewhere.com"});
			expect(attrs.rootAttrs.href).to.equal("http://somewhere.com");
		});
	});

	describe("getClassList", () => {
		it("includes 'ui'.", () => {
			let className = classnames(image.getClassList({}));
			expect(className).to.have.string("ui");
		});

		it("includes 'image'.", () => {
			let className = classnames(image.getClassList({}));
			expect(className).to.have.string("image");
		});

		it("includes 'hidden'.", () => {
			let className = classnames(image.getClassList({hidden: true}));
			expect(className).to.have.string("hidden");
		});

		it("includes 'disabled'.", () => {
			let className = classnames(image.getClassList({disabled: true}));
			expect(className).to.have.string("disabled");
		});

		it("includes 'bordered'.", () => {
			let className = classnames(image.getClassList({bordered: true}));
			expect(className).to.have.string("bordered");
		});

		it("includes 'fluid'.", () => {
			let className = classnames(image.getClassList({fluid: true}));
			expect(className).to.have.string("fluid");
		});

		it("includes 'rounded'.", () => {
			let className = classnames(image.getClassList({rounded: true}));
			expect(className).to.have.string("rounded");
		});

		it("includes 'circular'.", () => {
			let className = classnames(image.getClassList({circular: true}));
			expect(className).to.have.string("circular");
		});

		it("includes vertical alignment.", () => {
			let className = classnames(image.getClassList({verticalAlignment: "middle"}));
			expect(className).to.have.string("middle aligned");
		});

		it("includes 'centered'.", () => {
			let className = classnames(image.getClassList({centered: true}));
			expect(className).to.have.string("centered");
		});

		it("includes 'spaced'.", () => {
			let className = classnames(image.getClassList({spaced: true}));
			expect(className).to.have.string("spaced");
		});

		it("includes floats.", () => {
			let className = classnames(image.getClassList({float: "right"}));
			expect(className).to.have.string("right floated");
		});

		it("includes sizes.", () => {
			let className = classnames(image.getClassList({size: "big"}));
			expect(className).to.have.string("big");
		});
	});

	describe("view", () => {
		it("returns image if link is absent.", () => {
			let dom = m(image, {src: "http://something.com"}).view();
			expect(dom.tag).to.equal('img');
		});

		it("returns anchor if link is present.", () => {
			let dom = m(image, {link: "http://somewhere.com", src: "http://something.com"}).view();
			expect(dom.tag).to.equal('a');
		});
	});
});
