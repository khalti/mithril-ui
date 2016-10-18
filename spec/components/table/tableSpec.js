import {table} from "./../../../src/components/table/table.js";
import classnames from "classnames";
import {expect} from "chai";
import m from "mithril";


describe("table", () => {
	it("complains on invalid column count", () => {
		let atable = m(table, {columnCount: 0});
		expect(atable.view.bind(atable)).to.throw(Error);
	});

	it("complains on invalid color", () => {
		let atable = m(table, {color: "transparent"});
		expect(atable.view.bind(atable)).to.throw(Error);
	});

	it("complains on invalid size", () => {
		let atable = m(table, {size: "extra huge"});
		expect(atable.view.bind(atable)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'ui'", () => {
			let got = table.getClassList({});
			expect("ui").to.be.oneOf(got);
		});

		it("includes 'table'", () => {
			let got = table.getClassList({});
			expect("table").to.be.oneOf(got);
		});

		it("includes 'celled'", () => {
			let got = table.getClassList({celled: true});
			expect(classnames(got)).to.have.string("celled");
		});

		it("includes 'single line'", () => {
			let got = table.getClassList({singleLine: true});
			expect(classnames(got)).to.have.string("single line");
		});

		it("includes 'fixed'", () => {
			let got = table.getClassList({fixed: true});
			expect(classnames(got)).to.have.string("fixed");
		});

		it("includes 'stackable'", () => {
			let got = table.getClassList({stackable: true});
			expect(classnames(got)).to.have.string("stackable");
		});

		it("includes 'unstackable'", () => {
			let got = table.getClassList({unstackable: true});
			expect(classnames(got)).to.have.string("unstackable");
		});

		it("includes 'selectable'", () => {
			let got = table.getClassList({selectable: true});
			expect(classnames(got)).to.have.string("selectable");
		});

		it("includes 'striped'", () => {
			let got = table.getClassList({striped: true});
			expect(classnames(got)).to.have.string("striped");
		});

		it("includes 'basic'", () => {
			let got = table.getClassList({basic: true});
			expect(classnames(got)).to.have.string("basic");
		});

		it("includes 'very basic'", () => {
			let got = table.getClassList({veryBasic: true});
			expect(classnames(got)).to.have.string("very basic");
		});

		it("includes includes proper column count", () => {
			let got = table.getClassList({columnCount: 1});
			expect(classnames(got)).to.have.string("one column");
		});

		it("includes 'collapsing'", () => {
			let got = table.getClassList({collapsing: true});
			expect(classnames(got)).to.have.string("collapsing");
		});

		it("includes includes proper color", () => {
			let got = table.getClassList({color: "red"});
			expect(classnames(got)).to.have.string("red");
		});

		it("includes 'inverted'", () => {
			let got = table.getClassList({inverted: true});
			expect(classnames(got)).to.have.string("inverted");
		});

		it("includes 'sortable'", () => {
			let got = table.getClassList({inverted: true});
			expect(classnames(got)).to.have.string("inverted");
		});

		it("includes 'padded'", () => {
			let got = table.getClassList({padded: true});
			expect(classnames(got)).to.have.string("padded");
		});

		it("includes 'compact'", () => {
			let got = table.getClassList({compact: true});
			expect(classnames(got)).to.have.string("compact");
		});

		it("includes proper size", () => {
			let got = table.getClassList({size: "small"});
			expect(classnames(got)).to.have.string("small");
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets root element to be a 'table'", () => {
			expect(table.getDefaultAttrs({}).root).to.equal("table");
		});
	});
});
