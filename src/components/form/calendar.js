import {UI} from "./../base.js";
import o from "mithril";
import {Calendar as Cal} from "calendar";
import {Field} from "./field.js";
import {required, isString} from "validatex";
import {popup, popupBinder, popupPool} from "./../popup.js";
import {table, thead, tbody, th, tr, td} from "./../table";
import {grid, column} from "./../grid";
import {icon} from "./../icon";
import {button} from "./../button";


const WEEKDAYS = "Sun Mon Tue Wed Thu Fri Sat".split(" ");
const MONTHS = "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" ");

export class WeekBar extends UI {
	view ({attrs}) {
		return o(thead, attrs.rootAttrs,
			o(tr,
				WEEKDAYS.map(day => o(th, day))));
	}
}

export const weekBar = new WeekBar();

export class MonthDateGrid extends UI {
	getStyle (vnode) {
		return {
			"tbody td": {
				cursor: "pointer",
			},
			"tbody td.view-month": {
				fontWeight: "bold"
			},
			"tbody td.today": {
				backgroundColor: "black !important",
				color: "white"
			},
			"tbody td.selected": {
				backgroundColor: "blue !important",
				color: "white"
			}
		};
	}

	datesAreEqual(date1, date2) {
		date1.setHours(0,0,0,0);
		date2.setHours(0,0,0,0);
		let date1Time = date1.getTime();
		let date2Time = date2.getTime();
		return date1Time === date2Time;
	}

	view ({attrs}) {
		return o(tbody, attrs.rootAttrs,
			attrs.dateGrid.map(row => {
				return o(tr, {textAlignment: "center"},
					row.map(dateStr => {
						let date = new Date(dateStr);
						let dclass = [];
						this.datesAreEqual(date, new Date())? dclass.push("today"): "";
						this.datesAreEqual(date, new Date(attrs.model()))? dclass.push("selected"): "";
						date.getMonth() === attrs.viewMonth? dclass.push("view-month"): "";
						return o(td,
							{ color: "blue"
							, class: dclass.join(" ")
							, onclick: attrs.setDate.bind(undefined, date)
						 	, }, date.getDate());
					}));
			}));
	}
}

export const monthDateGrid = new MonthDateGrid();

export class CalendarWidget extends UI {
	getStyle (vnode) {
		return {
			"div .prev-month, div .next-month": {
				cursor: "pointer"
			}
		};
	}

	getMonthDates (year, month) {
		return new Cal().monthDates(year, month);
	}

	view ({attrs}) {
		return o("div", attrs.rootAttrs,
			o(grid,
				o(column, {width: 3, onclick: attrs.prevMonth},
					o(icon, {name: "chevron left", class: "prev-month", color: "blue"})),
				o(column, {width: 10, textAlignment: "center"},
					o("div.mth-year", MONTHS[attrs.viewMonth] + " " + attrs.viewYear)),
				o(column, {width: 3, onclick: attrs.nextMonth},
					o(icon, {name: "chevron right", class: "next-month", color: "blue"}))),
			o(table,
				{ veryBasic: true
				, size: "small"
			 	, },
				o(weekBar),
				o(monthDateGrid,
					{ dateGrid: this.getMonthDates(attrs.viewYear, attrs.viewMonth)
					, viewMonth: attrs.viewMonth
					, setDate: attrs.setDate
					, model: attrs.model
					, })));
	}
}

export const calendarWidget = new CalendarWidget();

export class Calendar extends Field {
	viewYear = undefined
	viewMonth = undefined

	oninit (vnode) {
		super.oninit(vnode);
		let {attrs} = vnode;

		if (!attrs.model()) {
			let today = new Date();
			this.setViewMonthYear(today);
		}
		// else {
		// 	viewYear =  //model year
		// 	viewMth =  // model mth
		// }
	}

	setViewMonthYear (date) {
		this.viewYear = date.getFullYear();
		this.viewMonth =  date.getMonth();
	}

	getDefaultAttrs (vnode) {
		let defaultAttrs =
			{ format: "YYYY-MM-DD"
			, type: "text"
		 	, readOnly: true
			, };
		let attrs = Object.assign(super.getDefaultAttrs(vnode), defaultAttrs);
		return attrs;
	}

	setDate (format, model, newDate) {
		let date = new Date(newDate);
		this.setViewMonthYear(date);
		model(newDate);
	}

	prevMonth () {
		let prevMonth = this.viewMonth - 1;
		if (prevMonth === -1) {
			this.viewYear += -1;
			this.viewMonth = 11;
			return;
		}

		this.viewMonth = prevMonth;
	}

	nextMonth () {
		let nextMonth = this.viewMonth + 1;
		if (nextMonth === 12) {
			this.viewYear += 1;
			this.viewMonth = 0;
			return;
		}

		this.viewMonth = nextMonth;
	}

	view (vnode) {
		let {attrs} = vnode;

		let view =
			o(popupBinder,
				// allow multiple events
				{ displayPopup: "onclick"
				, hidePopup: "onclick" },
				super.view(vnode),
				o(popup, {position: "bottom left"},
					o(calendarWidget,
						{ setDate: this.setDate.bind(this, attrs.format, attrs.model)
						, prevMonth: this.prevMonth.bind(this)
					 	, nextMonth: this.nextMonth.bind(this)
						, viewYear: this.viewYear
						, viewMonth: this.viewMonth
						, model: attrs.model
						, })));

		return view;
	}
}


export const calendar = new Calendar();
