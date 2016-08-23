import {row} from "./../../src/components/row.js";
import chai from "chai";
import classnames from "classnames";


let expect = chai.expect;

describe("row", () => {
	describe(".getClassList", () => {
		it("should include 'container'.", () => {
			let className = classnames(row.getClassList({}));
			expect(className).to.have.string("row");
		});

		it("should include proper 'columns' class", () => {
			let className = classnames(row.getClassList({columns: 1}));
			expect(className).to.have.string("one column");
		});

		it("should include proper 'stretched' class", () => {
			let className = classnames(row.getClassList({stretched: true}));
			expect(className).to.have.string("stretched");
		});

		it("should include proper 'color' class", () => {
			let className = classnames(row.getClassList({color: "blue"}));
			expect(className).to.have.string("blue");
		});

		it("should include proper 'centered' class", () => {
			let className = classnames(row.getClassList({centered: true}));
			expect(className).to.have.string("centered");
		});

		it("should include proper 'textAlignment' class", () => {
			let className = classnames(row.getClassList({textAlignment: "center"}));
			expect(className).to.have.string("center aligned");
		});

		it("should include proper 'verticalAlignment' class", () => {
			let className = classnames(row.getClassList({verticalAlignment: "bottom"}));
			expect(className).to.have.string("bottom aligned");
		});

		it("should include proper 'visible' class", () => {
			let className = classnames(row.getClassList({visible: ["mobile"]}));
			expect(className).to.have.string("mobile only");

			className = classnames(row.getClassList({visible: ["mobile", "computer"]}));
			expect(className).to.have.string("mobile computer only");
		});

		it("should include proper 'reverse' class", () => {
			let className = classnames(row.getClassList({reverse: "mobile"}));
			expect(className).to.have.string("mobile reversed");
		});
	});
});
