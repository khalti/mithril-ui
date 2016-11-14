import {expect} from "chai";
import _ from "mithril";
import {pagination} from "./../../src/components/pagination.js";
import {getVdom} from "./../../spec/utils.js";


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

	describe(".getClassList", () => {
		it("includes 'pagination'", () => {
			let got = pagination.getClassList({});
			expect(got.indexOf("pagination")).not.to.equal(-1);
		});
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

	describe(".getFirstPageBtn", () => {
		let attrs, clicked, clickEvent;

		beforeEach(() => {
			clicked = false;

			clickEvent = {
				preventDefault: () => {}
			};

			attrs = {
				onPageChange: () => {
					clicked = true;
				},
				pageCount: 10,
				currentPage: undefined
			};
		});

		it("sets icon to 'angle double left'", () => {
			let vdom = getVdom(pagination.getFirstPageBtn({}));

			let got = vdom.children[0].attrs.class;
			expect(got).to.contain("angle double left");
		});

		it("disables the button", () => {
			attrs.currentPage = 1;
			let vdom = getVdom(pagination.getFirstPageBtn(attrs));

			let got = vdom.attrs.class;

			expect(got).to.contain("disabled");
		});

		it("sets 'href' to '#'", () => {
			attrs.currentPage = 2;
			let vdom = getVdom(pagination.getFirstPageBtn(attrs));

			let got = vdom.attrs.href;

			expect(got).to.equal("#");
		});

		it("sets 'href' to ''", () => {
			attrs.currentPage = 1;
			let vdom = getVdom(pagination.getFirstPageBtn(attrs));

			let got = vdom.attrs.href;

			expect(got).to.equal("");
		});

		it("sets current page to 1 on click.", () => {
			let vdom = getVdom(pagination.getFirstPageBtn(attrs));
			vdom.attrs.onclick(clickEvent);

			expect(clicked).to.equal(true);
		});
	});

	describe(".getLastPageBtn", () => {
		let attrs, clicked, clickEvent;

		beforeEach(() => {
			clicked = false;

			clickEvent = {
				preventDefault: () => {}
			};

			attrs = {
				onPageChange: () => {
					clicked = true;
				},
				pageCount: 10,
				currentPage: undefined
			};
		});

		it("sets icon to 'angle double right'", () => {
			let vdom = getVdom(pagination.getLastPageBtn({}));

			let got = vdom.children[0].attrs.class;
			expect(got).to.contain("angle double right");
		});

		it("disables the button", () => {
			attrs.currentPage = 10;
			let vdom = getVdom(pagination.getLastPageBtn(attrs));

			let got = vdom.attrs.class;

			expect(got).to.contain("disabled");
		});

		it("sets 'href' to '#'", () => {
			attrs.currentPage = 9;
			let vdom = getVdom(pagination.getLastPageBtn(attrs));

			let got = vdom.attrs.href;

			expect(got).to.equal("#");
		});

		it("sets 'href' to ''", () => {
			attrs.currentPage = 10;
			let vdom = getVdom(pagination.getLastPageBtn(attrs));

			let got = vdom.attrs.href;

			expect(got).to.equal("");
		});

		it("sets current page to last page on click.", () => {
			let vdom = getVdom(pagination.getLastPageBtn(attrs));
			vdom.attrs.onclick(clickEvent);

			expect(clicked).to.equal(true);
		});
	});

	describe(".showLeft3dotsBtn", () => {
		it("returns true if visible pages do not contain the 1st page.", () => {
			expect(pagination.showLeft3dotsBtn(10, 4)).to.equal(true);
		});

		it("returns false if visible pages contain the 1st page.", () => {
			expect(pagination.showLeft3dotsBtn(10, 3)).to.equal(false);
		});
	});

	describe(".showRight3dotsBtn", () => {
		it("returns true if visible pages do not contain the last page.", () => {
			expect(pagination.showRight3dotsBtn(10, 7)).to.equal(true);
		});

		it("returns false if visible page contains the last page.", () => {
			expect(pagination.showRight3dotsBtn(10, 8)).to.equal(false);
		});
	});

	describe.only(".getPageBtn", () => {
		it("displays page number");

		it("disables button if current page and button page are same.");
		it("sets 'href' to '#'");
		it("sets 'href' to ''");
		it("calls 'onPageChange' on click.");
	});
});
