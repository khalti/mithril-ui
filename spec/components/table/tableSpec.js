import {window, getVnode} from "./../../utils.js";
import {table} from "./../../../src/components/table/table.js";
import {expect} from "chai";
import _ from "mithril";


describe("table", () => {
	let vnode;

	beforeEach(() => {
		vnode = getVnode();
	});

	it("complains on invalid column count", () => {
		vnode.attrs = {columnCount: 0};
		expect(table.oninit.bind(table, vnode)).to.throw(Error);
	});

	it("complains on invalid color", () => {
		vnode.attrs = {color: "transparent"};
		expect(table.oninit.bind(table, vnode)).to.throw(Error);
	});

	it("complains on invalid size", () => {
		vnode.attrs = {size: "extra huge"};
		expect(table.oninit.bind(table, vnode)).to.throw(Error);
	});

	describe("getClassList", () => {
		it("includes 'ui'", () => {
			expect(table.getClassList(vnode)).to.contain("ui");
		});

		it("includes 'table'", () => {
			expect(table.getClassList(vnode)).to.contain("table");
		});

		it("includes 'celled'", () => {
			vnode.attrs = {celled: true};
			expect(table.getClassList(vnode)).to.contain("celled");
		});

		it("includes 'single line'", () => {
			vnode.attrs = {singleLine: true};
			expect(table.getClassList(vnode)).to.contain("single line");
		});

		it("includes 'fixed'", () => {
			vnode.attrs = {fixed: true};
			expect(table.getClassList(vnode)).to.contain("fixed");
		});

		it("includes 'stackable'", () => {
			vnode.attrs = {stackable: true};
			expect(table.getClassList(vnode)).to.contain("stackable");
		});

		it("includes 'unstackable'", () => {
			vnode.attrs = {unstackable: true};
			expect(table.getClassList(vnode)).to.contain("unstackable");
		});

		it("includes 'selectable'", () => {
			vnode.attrs = {selectable: true};
			expect(table.getClassList(vnode)).to.contain("selectable");
		});

		it("includes 'striped'", () => {
			vnode.attrs = {striped: true};
			expect(table.getClassList(vnode)).to.contain("striped");
		});

		it("includes 'basic'", () => {
			vnode.attrs = {basic: true};
			expect(table.getClassList(vnode)).to.contain("basic");
		});

		it("includes 'very basic'", () => {
			vnode.attrs = {veryBasic: true};
			expect(table.getClassList(vnode)).to.contain("very basic");
		});

		it("includes includes proper column count", () => {
			vnode.attrs = {columnCount: 1};
			expect(table.getClassList(vnode)).to.contain("one column");
		});

		it("includes 'collapsing'", () => {
			vnode.attrs = {collapsing: true};
			expect(table.getClassList(vnode)).to.contain("collapsing");
		});

		it("includes includes proper color", () => {
			vnode.attrs = {color: "red"};
			expect(table.getClassList(vnode)).to.contain("red");
		});

		it("includes 'inverted'", () => {
			vnode.attrs = {inverted: true};
			expect(table.getClassList(vnode)).to.contain("inverted");
		});

		it("includes 'sortable'", () => {
			vnode.attrs = {inverted: true};
			expect(table.getClassList(vnode)).to.contain("inverted");
		});

		it("includes 'padded'", () => {
			vnode.attrs = {padded: true};
			expect(table.getClassList(vnode)).to.contain("padded");
		});

		it("includes 'compact'", () => {
			vnode.attrs = {compact: true};
			expect(table.getClassList(vnode)).to.contain("compact");
		});

		it("includes proper size", () => {
			vnode.attrs = {size: "small"};
			expect(table.getClassList(vnode)).to.contain("small");
		});
	});

	describe("getDefaultAttrs", () => {
		it("sets root element to be a 'table'", () => {
			expect(table.getDefaultAttrs(vnode).root).to.equal("table");
		});
	});
});
