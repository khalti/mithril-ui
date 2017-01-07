import {window, getVnode} from "./../../utils.js";
import {segment} from "./../../../src/components/segment/segment.js";
import {expect} from "chai";
import _ from "mithril";


describe("segment", () => {
	let vnode;

	beforeEach(() => {
		vnode = getVnode();
	});

	it("complains on invalid attachment.", () => {
		vnode.attrs = {attach: "west"};
		expect(segment.oninit.bind(segment, vnode)).to.throw(Error);
	});

	it("complains on invalid color.", () => {
		vnode.attrs = {color: "transparent"};
		expect(segment.oninit.bind(segment, vnode)).to.throw(Error);
	});

	it("complains on invalid emphasis.", () => {
		vnode.attrs = {emphasis: "no-emphasis"};
		expect(segment.oninit.bind(segment, vnode)).to.throw(Error);
	});

	it("complains on invalid text alignment.", () => {
		vnode.attrs = {emphasis: "up"};
		expect(segment.oninit.bind(segment, vnode)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'ui'", () => {
			expect(segment.getClassList(vnode)).to.contain("ui");
		});

		it("includes 'segment'.", () => {
			expect(segment.getClassList(vnode)).to.contain("segment");
		});

		it("includes 'raised'.", () => {
			vnode.attrs = {raised: true};
			expect(segment.getClassList(vnode)).to.contain("raised");
		});

		it("includes 'stacked'.", () => {
			vnode.attrs = {stacked: true};
			expect(segment.getClassList(vnode)).to.contain("stacked");
		});

		it("includes 'piled'.", () => {
			vnode.attrs = {piled: true};
			expect(segment.getClassList(vnode)).to.contain("piled");
		});

		it("includes 'vertical'.", () => {
			vnode.attrs = {vertical: true};
			expect(segment.getClassList(vnode)).to.contain("vertical");
		});

		it("includes 'disabled'.", () => {
			vnode.attrs = {disabled: true};
			expect(segment.getClassList(vnode)).to.contain("disabled");
		});

		it("includes 'loading'.", () => {
			vnode.attrs = {loading: true};
			expect(segment.getClassList(vnode)).to.contain("loading");
		});

		it("includes 'inverted'.", () => {
			vnode.attrs = {inverted: true};
			expect(segment.getClassList(vnode)).to.contain("inverted");
		});

		it("includes proper attachment.", () => {
			vnode.attrs = {attach: true};
			expect(segment.getClassList(vnode)).to.contain("attached");

			vnode.attrs = {attach: "top"};
			expect(segment.getClassList(vnode)).to.contain("top attached");

			//TODO: test other attachments
		});

		it("includes 'padded'.", () => {
			vnode.attrs = {padded: true};
			expect(segment.getClassList(vnode)).to.contain("padded");
		});

		it("includes 'compact'.", () => {
			vnode.attrs = {compact: true};
			expect(segment.getClassList(vnode)).to.contain("compact");
		});

		it("includes proper color.", () => {
			vnode.attrs = {color: "red"};
			expect(segment.getClassList(vnode)).to.contain("red");

			// TODO: test other colors
		});

		it("includes proper emphasis.", () => {
			vnode.attrs = {emphasis: "secondary"};
			expect(segment.getClassList(vnode)).to.contain("secondary");
		});

		it("includes 'circular'.", () => {
			vnode.attrs = {circular: true};
			expect(segment.getClassList(vnode)).to.contain("circular");
		});

		it("includes 'clearing'.", () => {
			vnode.attrs = {clearing: true};
			expect(segment.getClassList(vnode)).to.contain("clearing");
		});

		it("includes 'basic'.", () => {
			vnode.attrs = {basic: true};
			expect(segment.getClassList(vnode)).to.contain("basic");
		});

		it("includes proper text alignment.", () => {
			vnode.attrs = {textAlignment: "left"};
			expect(segment.getClassList(vnode)).to.contain("left aligned");
		});
	});
});
