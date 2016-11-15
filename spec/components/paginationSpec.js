import {expect} from "chai";
import _ from "mithril";
import {pagination} from "./../../src/components/pagination.js";
import {getVdom} from "./../../spec/utils.js";


let clickEvent = {
	preventDefault () {}
};

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

	describe(".getPageBtn", () => {
		let onPageChange, clicked;

		beforeEach(() => {
			clicked = false;

			onPageChange = () => {
				clicked = true;
			};
		});

		it("displays page number", () => {
			let pageNumber = 10;
			let pageBtn =  pagination.getPageBtn(onPageChange, pageNumber, 1);
			let page = getVdom(pageBtn).children[0];
			expect(page).to.equal(pageNumber);
		});

		it("sets button to be 'active' if current page and button page are same.", () => {
			let pageBtn = pagination.getPageBtn(onPageChange, 1, 1);
			let btnClass = getVdom(pageBtn).attrs.class;
			expect(btnClass).to.contain("active");
		});

		it("sets 'href' to '#'", () => {
			let pageBtn = pagination.getPageBtn(onPageChange, 2, 1);
			let href = getVdom(pageBtn).attrs.href;
			expect(href).to.contain("#");
		});

		it("sets 'href' to ''", () => {
			let pageBtn = pagination.getPageBtn(onPageChange, 1, 1);
			let href = getVdom(pageBtn).attrs.href;
			expect(href).to.contain("");
		});

		it("calls 'onPageChange' on click.", () => {
			let pageBtn = pagination.getPageBtn(onPageChange, 2, 1);
			let vdom = getVdom(pageBtn);
			vdom.attrs.onclick(clickEvent);

			expect(clicked).to.equal(true);
		});
	});

	describe(".getClickHandler", () => {
		let pageCheck, onPageChange;

		beforeEach(() => {
			onPageChange = (page) => {
				pageCheck = page;
			};
		});

		it("won't call page change handler if page number and current page are same", () => {
			let clickHandler = pagination.getClickHandler(onPageChange, 1, 1);
			clickHandler();
			expect(pageCheck).to.equal(undefined);
		});

		it("calls page change handler if page number and current page are different", () => {
			let clickHandler = pagination.getClickHandler(onPageChange, 2, 1);
			clickHandler(clickEvent);
			expect(pageCheck).to.equal(2);
		});
	});


	describe(".getPagesBtns", () => {
		it("returns visible pages", () => {
			let attrs = {
				onPageChange: () => {},
				pageCount: 10,
				currentPage: 5
			};
			let pages = pagination.getPagesBtns(attrs);
			console.log(pages);
			expect(pages.length).to.equal(5);
		});	
	});

	describe(".getNextPageBtn", () => {
		let clickedPage, attrs;

		let onPageChange = (page) => {
			clickedPage = page;
		};

		beforeEach(() => {
			clickedPage = undefined;
			attrs = {
				onPageChange: onPageChange,
				pageCount: 10,
				currentPage: 10 
			};
		});

		it("shows 'angle right' icon", () => {
			attrs.currentPage = 9;
			let nextBtn = pagination.getNextPageBtn(attrs);
			let vdom = getVdom(nextBtn);
			let icon = vdom.children[0];
			expect(icon.attrs.class).to.contain("angle right");
		});

		it("disables if currentPage is pageCount", () => {
			let nextBtn = pagination.getNextPageBtn(attrs);
			let vdom = getVdom(nextBtn);
			expect(vdom.attrs.class).to.contain("disabled");
		});

		it("sets href to '' if currentPage is pageCount", () => {
			let nextBtn = pagination.getNextPageBtn(attrs);
			let vdom = getVdom(nextBtn);
			expect(vdom.attrs.href).to.contain("");
		});

		it("changes page to next page on clicked", () => {
			attrs.currentPage = 8 
			let nextBtn = pagination.getNextPageBtn(attrs);
			let vdom = getVdom(nextBtn);
			vdom.attrs.onclick(clickEvent);

			expect(clickedPage).to.equal(9);
		});
	});

	describe(".getPreviousPageBtn", () => {
		let clickedPage, attrs;

		let onPageChange = (page) => {
			clickedPage = page;
		};

		beforeEach(() => {
			clickedPage = undefined;
			attrs = {
				onPageChange: onPageChange,
				pageCount: 10,
				currentPage: 1 
			};
		});

		it("shows 'angle left' icon", () => {
			attrs.currentPage = 9;
			let nextBtn = pagination.getPreviousPageBtn(attrs);
			let vdom = getVdom(nextBtn);
			let icon = vdom.children[0];
			expect(icon.attrs.class).to.contain("angle left");
		});

		it("disables if currentPage is 1", () => {
			let nextBtn = pagination.getPreviousPageBtn(attrs);
			let vdom = getVdom(nextBtn);
			expect(vdom.attrs.class).to.contain("disabled");
		});

		it("sets href to '' if currentPage is 1", () => {
			let nextBtn = pagination.getPreviousPageBtn(attrs);
			let vdom = getVdom(nextBtn);
			expect(vdom.attrs.href).to.contain("");
		});

		it("changes page to previous page on clicked", () => {
			attrs.currentPage = 8;
			let nextBtn = pagination.getPreviousPageBtn(attrs);
			let vdom = getVdom(nextBtn);
			vdom.attrs.onclick(clickEvent);

			expect(clickedPage).to.equal(7);
		});
	});
});
