import {expect} from "chai";
import _ from "mithril";
import {pagination} from "./../../src/components/pagination.js";


describe("pagination", () => {
	it("complains if current page is absent.", () => {
		let attrs = {
			// currentPage: 2,
			pageCount: 10,
			onPageChange: () => {}
		};
		expect(pagination.view.bind(pagination, attrs)).to.throw(Error);
	});

	it("complains if page count is absent.", () => {
		let attrs = {
			currentPage: 2, 
			// pageCount: 10,
			onPageChange: () => {}
		};
		expect(pagination.view.bind(pagination, attrs)).to.throw(Error);
	});

	it("complainss if page change call back is absent.", () => {
		let attrs = {
			currentPage: 2, 
			// pageCount: 10,
			onPageChange: () => {}
		};
		expect(pagination.view.bind(pagination, attrs)).to.throw(Error);
	});

	describe(".getPages", () => {
		it("it returns page range starting from 1 to given page count.", () => {
			let got = pagination.getPages(5);
			let expected = [1, 2, 3, 4, 5];
			expect(got).to.eql(expected);
		});
	});

	describe(".getVisiblePages", () => {
		it("returns 5 pages such that current page stays at the center", () => {
			let got = pagination.getVisiblePages(10, 5);
			let expected = [3, 4, 5, 6, 7];
			expect(got).to.eql(expected);
		});

		it("excludes pages beyond valid page range at lhs.", () => {
			let got1 = pagination.getVisiblePages(10, 2);
			let expected1 = [1, 2, 3, 4];
			expect(got1).to.eql(expected1);

			let got2 = pagination.getVisiblePages(10, 1);
			let expected2 = [1, 2, 3];
			expect(got2).to.eql(expected2);
		});

		it("excludes pages beyond valid page range at rhs.", () => {
			let got1 = pagination.getVisiblePages(10, 9);
			let expected1 = [7, 8 , 9, 10];
			expect(got1).to.eql(expected1);

			let got2 = pagination.getVisiblePages(10, 10);
			let expected2 = [8 , 9, 10];
			expect(got2).to.eql(expected2);
		});
	});
});
