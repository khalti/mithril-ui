import {UI} from "./base.js";
import o from "mithril";
import {required, isArray} from "validatex";
import {icon} from "./icon";
import {firstMatch} from "./../helpers/misc.js";

const SPACE = 32;
const ENTER = 13;
const ESC = 27;
const SELECTOR_RESET_INTERVAL = 500;


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
	}

	toggleActive (e) {
		this.active = !this.active;
	}

	deactive (e) {
		this.active = false;
	}

	getDefaultAttrs (vnode) {
		return {
			rootAttrs: {
				tabindex: 0,
				onclick: this.toggleActive.bind(this),
				onblur: this.deactive.bind(this),
				onkeypress: this.captureKeyPress.bind(this)
			}
		};
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

	setSelector (character) {
		if (!this.active) return;

		this.clearSelectorTimmer && clearTimeout(this.clearSelectorTimmer);

		this.selector = this.selector + character;

		this.clearSelectorTimmer = setTimeout(this.clearSelector.bind(this), SELECTOR_RESET_INTERVAL);
	}

	captureKeyPress (e) {
		if (e.keyCode === SPACE) {
			this.toggleActive();
			e.preventDefault();
		}
		else if (e.keyCode === ENTER) {
			console.log("set value and close dropdown");
		}
		else if (e.keyCode === ESC) {
			console.log("close dropdown");
		}
		else {
			this.setSelector(e.key);
		}
	}

	shouldSelectOption (option, attrs) {
		let selectedOption = firstMatch(attrs.options, (anOption) => {
			const selector = this.selector;
			return selector && anOption.label.toLowerCase().match("^" + selector);
		});

		return !selectedOption && attrs.model() === option.value + "" || selectedOption === option;
	}

	view ({attrs, children, state}) {
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
						? attrs.options.map((option) => {
							let itemAttrs =
							{ "data-value": option.value
							, onclick: o.withAttr("data-value", attrs.model) };

							if (this.shouldSelectOption(option, attrs)) {
								itemAttrs.active = true;
								itemAttrs.selected = true;
							}

							return o(dropdownItem, itemAttrs, option.label);
						})
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
