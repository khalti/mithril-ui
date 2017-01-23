import {UI} from "./base.js";
import o from "mithril";
import {required, isArray} from "validatex";
import {icon} from "./icon";
import {firstMatch} from "./../helpers/misc.js";
import {range} from "lodash";


const SPACE = 32;
const ENTER = 13;
const ESC = 27;
const SELECTOR_RESET_INTERVAL = 500;
const UP_KEY = 38;
const DOWN_KEY = 40;


export class Dropdown extends UI {
	attrSchema = {
		text: required(false),
		options: [required(false), isArray()],
		placeholder: required(false),
		model: required(false),
		search: required(false)
	};

	oninit (vnode) {
		super.oninit(vnode);
		this.active = false;
		this.selector = "";
		this.selectedIndex = -1;
	}

	toggleActive () {
		this.active = !this.active;
	}

	deactive () {
		this.active = false;
	}

	getDefaultAttrs (vnode) {
		let attrs = {
			rootAttrs: {
				tabindex: 0,
				onclick: this.toggleActive.bind(this),
				onblur: this.deactive.bind(this),
			}
		};

		if (vnode.attrs.model) {
			attrs.onkeydown = this.captureKeyPress.bind(this, vnode.attrs.options);
		}

		return attrs;
	}

	getClassList ({attrs}) {
		return [
			"ui",
			this.active && "active visible",
			attrs.options && "selection",
			attrs.search && "search",
			"dropdown"
		];
	}

	isSelection(attrs) {
		return attrs.model? true: false;
	}

	isDefaultText (attrs, text) {
		return attrs.model && attrs.placeholder === text;
	}

	getText (attrs) {
		if (!attrs.model) return attrs.text;
		if (attrs.model && !attrs.model()) return attrs.placeholder;

		return firstMatch((attrs.options), (option) => {
			return option.value + "" === attrs.model();
		}).label;
	}

	clearSelector () {
		this.selector = "";
	}

	setSelector (options, character) {
		if (!this.active) return;

		this.clearSelectorTimmer && clearTimeout(this.clearSelectorTimmer);

		this.selector = this.selector + character;

		for (let i = 0; i < options.length; i ++) {
			if (options[i].label.toLowerCase().match("^" + this.selector)) {
				this.selectedIndex = i;
				break;
			}
		}

		this.clearSelectorTimmer = setTimeout(this.clearSelector.bind(this), SELECTOR_RESET_INTERVAL);
	}

	incSelectedIndex (options) {
		this.selectedIndex ++;

		if (this.selectedIndex === options.length) {
			this.selectedIndex = 0;
		}
	}

	decSelectedIndex (options) {
		this.selectedIndex --;

		if (this.selectedIndex === -1) {
			this.selectedIndex = options.length - 1;
		}
	}

	captureKeyPress (options, e) {
		if ([SPACE, ENTER, ESC, UP_KEY, DOWN_KEY].indexOf(e.keyCode) !== -1 ||
				e.keyCode >= 65 && e.keyCode <= 90 ||
				e.keyCode >= 48 && e.keyCode <= 57) {

			if (!this.active && [ENTER, ESC, SPACE].indexOf(e.keyCode) === -1) {
				this.active = true;
			}

			if (e.keyCode === ESC) {
				console.log("close dropdown");
			}
			else if (e.keyCode == UP_KEY) {
				this.decSelectedIndex(options);
			}
			else if (e.keyCode == DOWN_KEY) {
				this.incSelectedIndex(options);
			}
			else if (e.keyCode === SPACE) {
				console.log("toggle active");
				this.toggleActive();
			}
			else if (e.keyCode === ENTER) {
				console.log("set value and close dropdown");
			}
			else {
				this.setSelector(options, e.key);
			}

			e.preventDefault();
		}
	}

	shouldSelectOption (option, attrs, currentIndex) {
		let selectedOption = firstMatch(attrs.options, (anOption) => {
			const selector = this.selector;
			const selectedIndex = this.selectedIndex;

			if (selector) {
				return selector && anOption.label.toLowerCase().match("^" + selector);
			}

			return selectedIndex === currentIndex;

		});

		return !selectedOption && attrs.model() === option.value + "" || selectedOption === option;
	}

	getProcessedOptions (attrs) {
		let index = 0;

		return attrs.options.map((option) => {
			let itemAttrs =
				{ "data-value": option.value
				, onclick: o.withAttr("data-value", attrs.model) };

			if (this.selectedIndex === index) {
				itemAttrs.active = true;
				itemAttrs.selected = true;
			}

			index ++;
			return o(dropdownItem, itemAttrs, option.label);
		});
	}

	view ({attrs, children, state}) {
		console.log("redrawing ...");
		const isSelection = this.isSelection(attrs);
		const text = this.getText(attrs);

		let inputAttrs = {type: "hidden"};
		if (isSelection && attrs.name) {
			name: attrs.name
		}

		return o("div", attrs.rootAttrs,
				isSelection? o("input", inputAttrs): null,

				o(dropdownText, {default: this.isDefaultText(attrs, text)}, text),
				o(icon, {name: "dropdown"}),

				attrs.search? o("input.search[tabindex=0][autocomplete=off]"): null,

				o(dropdownMenu, {visible: this.active},
					isSelection
						? this.getProcessedOptions(attrs)
						: children));
	}
}


export const dropdown = new Dropdown();


export class DropdownText extends UI {
	getClassList ({attrs}) {
	return [
			attrs.default && "default",
			"text"
		];
	}
}

export const dropdownText = new DropdownText();

export class DropdownMenu extends UI {
	attrSchema = {
		visible: required(true)
	};

	getDefaultAttrs (vnode) {
		let attrs = super.getDefaultAttrs(vnode);

		if (vnode.attrs.visible) {
			attrs.rootAttrs = {style: {display: "block"}};
		}

		return attrs;
	}

	getClassList ({attrs}) {
		return [
			attrs.visible? "visible": "hidden",
			"menu"
		];
	}
}

export const dropdownMenu = new DropdownMenu();


export class DropdownItem extends UI {
	getClassList ({attrs}) {
		return [
			attrs.active && "active",
			attrs.selected && "selected",
			"item"
		];
	}
}

export const dropdownItem = new DropdownItem();
