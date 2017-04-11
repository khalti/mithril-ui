import {window, getVnode, trigger} from "./../utils.js";
import {expect} from "chai";
import _ from "mithril";
import {Pagination} from "./../../src/components/pagination.js";
import {getVdom} from "./../../spec/utils.js";


let clickEvent = {
	preventDefault () {}
};

describe("Pagination", () => {
	let vnode, pagination;

	beforeEach(() => {
		pagination = new Pagination();
		vnode = getVnode();
	});

	it("complains if current page is absent.", () => {
		vnode.attrs = {
			// currentPage: 2,
			pageCount: 10,
			onPageChange: () => {}
		};
		expect(pagination.oninit.bind(pagination, vnode)).to.throw(Error);
	});

	it("complains if page count is absent.", () => {
		vnode.attrs = {
			currentPage: 2,
			// pageCount: 10,
			onPageChange: () => {}
		};
		expect(pagination.oninit.bind(pagination, vnode)).to.throw(Error);
	});

	it("complainss if page change call back is absent.", () => {
		vnode.attrs = {
			currentPage: 2,
			// pageCount: 10,
			onPageChange: () => {}
		};
		expect(pagination.oninit.bind(pagination, vnode)).to.throw(Error);
	});

	describe(".getClassList", () => {
		it("includes 'pagination'", () => {
			expect(pagination.getClassList(vnode)).to.contain("pagination");
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
			_.render(document.body, pagination.getFirstPageBtn({}));
			let iconDom = document.querySelector("i");

			expect(iconDom.className).to.contain("angle double left");
		});

		it("disables the button", () => {
			attrs.currentPage = 1;
			_.render(document.body, pagination.getFirstPageBtn(attrs));

			expect(document.body.childNodes[0].className).to.contain("disabled");
		});

		it("sets 'href' to '#'", () => {
			attrs.currentPage = 2;
			_.render(document.body, pagination.getFirstPageBtn(attrs));

			let rootDom = document.body.childNodes[0];
			expect(rootDom.getAttribute("href")).to.equal("#");
		});

		it("sets 'href' to ''", () => {
			attrs.currentPage = 1;
			_.render(document.body, pagination.getFirstPageBtn(attrs));

			let rootDom = document.body.childNodes[0];
			expect(rootDom.getAttribute("href")).to.equal("");
		});

		it("sets current page to 1 on click.", () => {
			_.render(document.body, pagination.getFirstPageBtn(attrs));

			let rootDom = document.body.childNodes[0];
			trigger("click", rootDom);

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
			_.render(document.body, pagination.getLastPageBtn({}));
			let iconDom = document.querySelector("i");

			expect(iconDom.className).to.contain("angle double right");
		});

		it("disables the button", () => {
			attrs.currentPage = 10;
			_.render(document.body, pagination.getLastPageBtn(attrs));

			expect(document.body.childNodes[0].className).to.contain("disabled");
		});

		it("sets 'href' to '#'", () => {
			attrs.currentPage = 9;
			_.render(document.body, pagination.getLastPageBtn(attrs));

			let rootDom = document.body.childNodes[0];
			expect(rootDom.getAttribute("href")).to.equal("#");
		});

		it("sets 'href' to ''", () => {
			attrs.currentPage = 10;
			_.render(document.body, pagination.getLastPageBtn(attrs));

			let rootDom = document.body.childNodes[0];
			expect(rootDom.getAttribute("href")).to.equal("");
		});

		it("sets current page to last page on click.", () => {
			_.render(document.body, pagination.getLastPageBtn(attrs));

			let rootDom = document.body.childNodes[0];
			trigger("click", rootDom);

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
			_.render(document.body, pagination.getPageBtn(onPageChange, pageNumber, 1));
			let rootDom = document.querySelector(".item");
			expect(rootDom.textContent).to.equal("" + pageNumber);
		});

		it("sets button to be 'active' if current page and button page are same.", () => {
			_.render(document.body, pagination.getPageBtn(onPageChange, 1, 1));
			let rootDom = document.querySelector(".item");
			expect(rootDom.className).to.contain("active");
		});

		it("sets 'href' to '#'", () => {
			_.render(document.body, pagination.getPageBtn(onPageChange, 2, 1));
			let rootDom = document.querySelector(".item");
			expect(rootDom.getAttribute("href")).to.contain("#");
		});

		it("sets 'href' to ''", () => {
			_.render(document.body, pagination.getPageBtn(onPageChange, 1, 1));
			let rootDom = document.querySelector(".item");
			expect(rootDom.getAttribute("href")).to.contain("");
		});

		it("calls 'onPageChange' on click.", () => {
			_.render(document.body, pagination.getPageBtn(onPageChange, 2, 1));
			let rootDom = document.querySelector(".item");
			trigger("click", rootDom);
			expect(clicked).to.equal(true);
		});
	});

	describe(".getClickHandler", () => {
		let pageCheck, onPageChange;

		beforeEach(() => {
			pageCheck = undefined;
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

		it("won't call page change handler if pageNumber is 'undefined'.", () => {
			let clickHandler = pagination.getClickHandler(onPageChange, undefined, 1);
			clickHandler(clickEvent);
			expect(pageCheck).to.equal(undefined);
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
			_.render(document.body, pagination.getNextPageBtn(attrs));
			let iconDom = document.querySelector("i");
			expect(iconDom.className).to.contain("angle right");
		});

		it("disables if currentPage is pageCount", () => {
			_.render(document.body, pagination.getNextPageBtn(attrs));
			let itemDom = document.querySelector(".item");
			expect(itemDom.className).to.contain("disabled");
		});

		it("sets href to '' if currentPage is pageCount", () => {
			_.render(document.body, pagination.getNextPageBtn(attrs));
			let itemDom = document.querySelector(".item");
			expect(itemDom.getAttribute("href")).to.contain("");
		});

		it("changes page to next page on clicked", () => {
			attrs.currentPage = 8
			_.render(document.body, pagination.getNextPageBtn(attrs));
			let itemDom = document.querySelector(".item");
			trigger("click", itemDom);

			expect(clickedPage).to.equal(9);
		});

		it("won't change page if next page is greater than pageCount", () => {
			attrs.currentPage = 10
			_.render(document.body, pagination.getNextPageBtn(attrs));
			let itemDom = document.querySelector(".item");
			trigger("click", itemDom);

			expect(clickedPage).to.equal(undefined);
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
			_.render(document.body, pagination.getPreviousPageBtn(attrs));
			let iconDom = document.querySelector("i");
			expect(iconDom.className).to.contain("angle left");
		});

		it("disables if currentPage is 1", () => {
			_.render(document.body, pagination.getPreviousPageBtn(attrs));
			let rootDom = document.querySelector(".item");
			expect(rootDom.className).to.contain("disabled");
		});

		it("sets href to '' if currentPage is 1", () => {
			_.render(document.body, pagination.getPreviousPageBtn(attrs));
			let rootDom = document.querySelector(".item");
			expect(rootDom.getAttribute("href")).to.contain("");
		});

		it("changes page to previous page on click", () => {
			attrs.currentPage = 8;
			_.render(document.body, pagination.getPreviousPageBtn(attrs));
			let rootDom = document.querySelector(".item");
			trigger("click", rootDom);

			expect(clickedPage).to.equal(7);
		});

		it("won't change page if next page is greater than pageCount", () => {
			attrs.currentPage = 1
			_.render(document.body, pagination.getPreviousPageBtn(attrs));
			let rootDom = document.querySelector(".item");
			trigger("click", rootDom);

			expect(clickedPage).to.equal(undefined);
		});
	});
});
