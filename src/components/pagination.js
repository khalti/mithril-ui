import component from "mithril-componentx";
import {menu, item} from "./menu";
import _ from "mithril";
import {required, isNumber, isFunction} from "validatex";
import {icon} from "./icon.js";


export const pagination = component({
	name: "pagination",

	base: menu,

	attrSchema: {
		currentPage: [required(true), isNumber()],
		pageCount: [required(true), isNumber()],
		onPageChange: [required(true), isFunction()]
	},

	getClassList(attrs) {
		let classList = this.base.getClassList(attrs);
		classList.push("pagination");
		return classList;
	},

	getPages(pageCount) {
		return Array.from(new Array(pageCount), (x,i) => i + 1);
	},

	getVisiblePages(pageCount, currentPage) {
		let totalPages = this.getPages(pageCount);

		let cp = currentPage;
		let idealVisiblePages = [cp - 2, cp - 1, cp, cp + 1, cp + 2];

		return totalPages.filter((page) => {
			return idealVisiblePages.indexOf(page) !== -1;
		});
	},

	getFirstPageBtn ({onPageChange, pageCount, currentPage}) {
		let isCurrentPage = currentPage === 1;

		return _(item, {disabled: isCurrentPage,
										href: isCurrentPage? "" : "#",
										onclick: this.getClickHandler(onPageChange, 1, currentPage) },
							_(icon, {class: "angle double left icon"}));
	},

	getLastPageBtn ({onPageChange, pageCount, currentPage}) {
		let isCurrentPage = currentPage === pageCount;

		return _(item, {href: isCurrentPage? "": "#",
										disabled: isCurrentPage,
										onclick: this.getClickHandler(onPageChange, pageCount, currentPage) },
							_(icon, {class: "angle double right icon"}));
	},

	showLeft3dotsBtn(pageCount, currentPage) {
		return this.getVisiblePages(pageCount, currentPage).indexOf(1) === -1;
	},

	showRight3dotsBtn (pageCount, currentPage) {
		return this.getVisiblePages(pageCount, currentPage).indexOf(pageCount) === -1;
	},

	get3dotsBtn () {
		return _(item, {disabled: true},
						_(icon, {class: "ellipsis horizontal icon"}));
	},

	getPageBtn (onPageChange, pageNumber, currentPage) {
		let isCurrentPage = pageNumber === currentPage;

		return _(item, {active: isCurrentPage,
										href: isCurrentPage? "": "#",
										onclick: this.getClickHandler(onPageChange, pageNumber, currentPage)},
							pageNumber)
	},

	getClickHandler (pageChangeHandler, pageNumber, currentPage) {
		return (e) => {
			if (pageNumber === currentPage || pageNumber === undefined) return;
			e.preventDefault();
			pageChangeHandler(pageNumber);
		};
	},

	getPagesBtns ({onPageChange, pageCount, currentPage}) {
		return this.getVisiblePages(pageCount, currentPage).map((page) => {
			return this.getPageBtn(onPageChange, page, currentPage);
		});
	},

	getNextPageBtn ({onPageChange, pageCount, currentPage}) {
		let nextPage = currentPage + 1;
		let disabled = currentPage === pageCount;

		return _(item, {href: disabled? "": "#",
										disabled: disabled,
										onclick: this.getClickHandler(
												onPageChange,
												nextPage <= pageCount ? nextPage: undefined,
												currentPage)},
						_(icon, {class: "angle right icon"}));
	},

	getPreviousPageBtn ({onPageChange, pageCount, currentPage}) {
		let previousPage = currentPage - 1;
		let disabled = currentPage === 1;

		return _(item, {href: disabled? "": "#",
										disabled: disabled,
										onclick: this.getClickHandler(
												onPageChange,
												previousPage > 0? previousPage: undefined,
												currentPage)},
						_(icon, {class: "angle left icon"}));
	},

	getItems (attrs) {
		let {onPageChange, pageCount, currentPage} = attrs;
		let items = this.getPagesBtns(attrs);

		// add ... at either side of visible pages
		this.showLeft3dotsBtn(pageCount, currentPage)? items.unshift(this.get3dotsBtn()): null;
		this.showRight3dotsBtn(pageCount, currentPage)? items.push(this.get3dotsBtn()): null;

		// add < and >
		items.unshift(this.getPreviousPageBtn(attrs));
		items.push(this.getNextPageBtn(attrs));

		// add << and >>
		items.unshift(this.getFirstPageBtn(attrs));
		items.push(this.getLastPageBtn(attrs));

		return items;
	},

	view ({attrs, children, state}) {
		return _("div", attrs.rootAttrs, this.getItems(attrs));
	}
});
