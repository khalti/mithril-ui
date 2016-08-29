import {column} from "./../../src/components/column.js";
import m from "mithril";
import chai from "chai";
import classnames from "classnames";

let expect = chai.expect;

describe("column", () => {
	describe(".getClassList", () => {
		it("should include 'column'", () => {
			let className = classnames(column.getClassList({}));
			expect(className).to.have.string("column");
		});

		it("should include proper 'float' class", () => {
			let className = classnames(column.getClassList({float: "left"}));
			expect(className).to.have.string("left floated");
		});

		it("should include proper 'width' class", () => {
			let className = classnames(column.getClassList({width: 8}));
			expect(className).to.have.string("eight wide");
		});

		it("should include proper 'color' class", () => {
			let className = classnames(column.getClassList({color: "blue"}));
			expect(className).to.have.string("blue");
		});

		it("should include proper 'textAlignment' class", () => {
			let className = classnames(column.getClassList({textAlignment: "center"}));
			expect(className).to.have.string("center aligned");
		});

		it("should include proper 'visible' class", () => {
			let className = classnames(column.getClassList({visible: ["mobile"]}));
			expect(className).to.have.string("mobile only");

			className = classnames(column.getClassList({visible: ["mobile", "computer", "largeScreen", "widescreen"]}));
			expect(className).to.have.string("mobile computer large screen widescreen only");
		});

		it("should include proper 'mobile' class", () => {
			let className = classnames(column.getClassList({mobile: 8}));
			expect(className).to.have.string("eight wide mobile");
		});

		it("should include proper 'tablet' class", () => {
			let className = classnames(column.getClassList({tablet: 8}));
			expect(className).to.have.string("eight wide tablet");
		});

		it("should include proper 'computer' class", () => {
			let className = classnames(column.getClassList({computer: 8}));
			expect(className).to.have.string("eight wide computer");
		});

		it("should include proper 'largeScreen' class", () => {
			let className = classnames(column.getClassList({largeScreen: 8}));
			expect(className).to.have.string("eight wide large screen");
		});

		it("should include proper 'widescreen' class", () => {
			let className = classnames(column.getClassList({widescreen: 8}));
			expect(className).to.have.string("eight wide widescreen");
		});
	});
});
