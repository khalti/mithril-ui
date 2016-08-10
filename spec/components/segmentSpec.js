import {segment} from "./../../src/components/segment.js";
import {expect} from "chai";
import classnames from "classnames";
import m from "mithril";


describe("segment", () => {
	it("complains on invalid attachment.", () => {
		let aSegment = m(segment, {attach: "west"});
		expect(aSegment.view.bind(aSegment)).to.throw(Error);
	});

	it("complains on invalid color.", () => {
		let aSegment = m(segment, {color: "transparent"});
		expect(aSegment.view.bind(aSegment)).to.throw(Error);
	});

	it("complains on invalid emphasis.", () => {
		let aSegment = m(segment, {emphasis: "no-emphasis"});
		expect(aSegment.view.bind(aSegment)).to.throw(Error);
	});

	it("complains on invalid text alignment.", () => {
		let aSegment = m(segment, {emphasis: "up"});
		expect(aSegment.view.bind(aSegment)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'ui'", () => {
			let className = classnames(segment.getClassList({}));
			expect(className).to.have.string("ui");
		});

		it("includes 'segment'.", () => {
			let className = classnames(segment.getClassList({}));
			expect(className).to.have.string("segment");
		});

		it("includes 'raised'.", () => {
			let className = classnames(segment.getClassList({raised: true}));
			expect(className).to.have.string("raised");
		});

		it("includes 'stacked'.", () => {
			let className = classnames(segment.getClassList({stacked: true}));
			expect(className).to.have.string("stacked");
		});

		it("includes 'piled'.", () => {
			let className = classnames(segment.getClassList({piled: true}));
			expect(className).to.have.string("piled");
		});

		it("includes 'vertical'.", () => {
			let className = classnames(segment.getClassList({vertical: true}));
			expect(className).to.have.string("vertical");
		});

		it("includes 'disabled'.", () => {
			let className = classnames(segment.getClassList({disabled: true}));
			expect(className).to.have.string("disabled");
		});

		it("includes 'loading'.", () => {
			let className = classnames(segment.getClassList({loading: true}));
			expect(className).to.have.string("loading");
		});

		it("includes 'inverted'.", () => {
			let className = classnames(segment.getClassList({inverted: true}));
			expect(className).to.have.string("inverted");
		});

		it("includes proper attachment.", () => {
			var className = classnames(segment.getClassList({attach: true}));
			expect(className).to.have.string("attached");

			className = classnames(segment.getClassList({attach: "top"}));
			expect(className).to.have.string("top attached");

			//TODO: test other attachments
		});

		it("includes 'padded'.", () => {
			let className = classnames(segment.getClassList({padded: true}));
			expect(className).to.have.string("padded");
		});

		it("includes 'compact'.", () => {
			let className = classnames(segment.getClassList({compact: true}));
			expect(className).to.have.string("compact");
		});

		it("includes proper color.", () => {
			let className = classnames(segment.getClassList({color: "red"}));
			expect(className).to.have.string("red");

			// TODO: test other colors
		});

		it("includes proper emphasis.", () => {
			let className = classnames(segment.getClassList({emphasis: "secondary"}));
			expect(className).to.have.string("secondary");
		});

		it("includes 'circular'.", () => {
			let className = classnames(segment.getClassList({circular: true}));
			expect(className).to.have.string("circular");
		});

		it("includes 'clearing'.", () => {
			let className = classnames(segment.getClassList({clearing: true}));
			expect(className).to.have.string("clearing");
		});

		it("includes 'basic'.", () => {
			let className = classnames(segment.getClassList({basic: true}));
			expect(className).to.have.string("basic");
		});

		it("includes proper text alignment.", () => {
			let className = classnames(segment.getClassList({textAlignment: "left"}));
			expect(className).to.have.string("left");
		});
	});
});
