import component from "mithril-componentx";
import {menu, item} from "./menu";
import _ from "mithril";
import {required, isNumber, isFunction} from "validatex";


export const pagination = component({
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
		return _(item, { "data-page": 1,
											disabled: currentPage == 1,
											href: "#",
											onclick: this.getClickHandler(onPageChange, 1, currentPage) },
							_(icon, {class: "angle double left large icon"}));
	},


	getLastPageBtn ({onPageChange, pageCount, currentPage}) {
		return _(item, { "data-page": pageCount,
											href: "#",
											disabled: pageCount == currentPage,
											onclick: this.getClickHandler(onPageChange, pageCount, currentPage) },
							_(icon, {class: "angle double right large icon"}));
	},

	get3dotsBtn () {
		return _(item, {disabled: true, href: "#", onclick: (e) => {e.preventDefault();}},
						_(icon, {class: "ellipsis horizontal large icon"}));
	},

	getPageBtn ({onPageChange, pageNumber, currentPage}) {
		return _(item, {active: pageNumber === currentPage,
										onclick: this.getClickHandler(onPageChange, pageNumber, currentPage)},
							page)
	},

	getClickHandler (pageChangeHandler, pageNumber, currentPage) {
		return (e) => {
			if (pageNumber === currentPage) return;
			e.preventDefault();
			pageChangeHandler(pageNumber);
		};
	},

	view ({attrs, children, state}) {
		let {onPageChange, pageCount, currentPage} = attrs;
		return _("div", attrs.rootAttrs, );
	}
});
