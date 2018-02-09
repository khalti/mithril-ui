import {UI} from "./base.js";
import o from "mithril";
import {required, isArray} from "validatex";
import {Icon} from "./icon";
import {firstMatch} from "./../helpers/misc.js";
import {Label} from "./label.js";
import {isArray as issArray} from "./../helpers/type.js";


const SPACE = 32;
const ENTER = 13;
const ESC = 27;
const SELECTOR_RESET_INTERVAL = 500;
const UP_KEY = 38;
const DOWN_KEY = 40;


export class SelectedItem extends Label {
	unselect (attrs, e) {
		e.stopPropagation();

		let selectedItems = attrs.model();
		let index = selectedItems.indexOf(attrs.item.value);
		selectedItems.splice(index, 1);
		attrs.model(selectedItems);
	}

	view ({attrs, state, children}) {
		return o("a", attrs.rootAttrs,
			attrs.item.label,
			o(Icon, {name: "delete", onclick: this.unselect.bind(this, attrs)})
		);
	}
}

export class Dropdown extends UI {
	attrSchema = {
		text: required(false),
		options: [required(false), isArray()],
		placeholder: required(false),
		model: required(false),
		name: required(false),
		search: required(false),
		multiple: required(false)
	};

	oninit (vnode) {
		super.oninit(vnode);
		this.multiple = vnode.attrs.multiple;
		this.active = false;
		this.selector = "";

		this.selectedIndex = -1;
	}

	listenClickOnDocument () {
		this.hideDropdownListener = (e) => {
			if (e.srcComponent === this.vnode.dom) return;
			this.hideDropdown(e);
			o.redraw();
		}

		document.addEventListener("click", this.hideDropdownListener);
	}

	unlistenClickOnDocument () {
		document.removeEventListener("click", this.hideDropdownListener);
	}

	onbeforeremove (vnode) {
		this.unlistenClickOnDocument();
	}

	attachComponentRootToEvent (e) {
		e.srcComponent = this.vnode.dom;
	}

	toggleActive (e) {
		this.active === true? this.hideDropdown(e): this.displayDropdown(e);
	}

	hideDropdown (e) {
		this.active = false;
		this.unlistenClickOnDocument();
	}

	focusSearchInput(componentRoot) {
		if (componentRoot.className.match("search")) {
			let children = componentRoot.childNodes;
			for (let i = 0; i < children.length; i ++ ) {
				let child = children[i];
				if (child.className.match("search")) {
					child.focus();
				}
			}
		}
	}

	displayDropdown (e) {
		this.attachComponentRootToEvent(e);
		this.listenClickOnDocument();
		this.active = true;
		this.focusSearchInput(e.srcComponent);
	}

	getDefaultAttrs (vnode) {
		let attrs = {
			rootAttrs: {
				tabindex: 0,
				onclick: this.toggleActive.bind(this),
				onkeydown: this.captureKeyPress.bind(this, vnode.attrs)
			}
		};

		return attrs;
	}

	getClassList ({attrs}) {
		return [
			"ui",
			this.active && "active visible",
			attrs.options && "selection",
			attrs.search && "search",
			attrs.fluid && "fluid",
			attrs.inline && "inline",
			attrs.multiple && "multiple",
			"dropdown"
		];
	}
 
	isSelection(attrs) {
		return attrs.model? true: false;
	}

	isDefaultText (attrs, text) {
		return attrs.model && attrs.placeholder === text;
	}

	isEmpty (val) {
		return (val === null || val === undefined || val === "");
	}

	getText (attrs) {
		if (!attrs.model) return attrs.text;
		if ( attrs.model && (this.isEmpty(attrs.model()) || (attrs.multiple && attrs.model().length == 0)) && attrs.placeholder) {
			return attrs.placeholder;
		}

		if (attrs.multiple) return "";

		let match = firstMatch((attrs.options), (option) => {
			return option.value === attrs.model();
		});

		if (match) return match.label;

		if (attrs.options.length > 0) return attrs.options[0].label;
	}

	clearSelector () {
		this.selector = "";
	}

	matchOptionLabel(label, selector) {
		label = "" + label;
		selector = "" + selector;
		return selector? label.toLowerCase().match("^" + selector.toLowerCase()): false;
	}

	setSelector (attrs, character) {
		let {options, search} = attrs;

		if (!this.active) return;

		if (!character) {
			this.selectedIndex = -1;
		}

		this.clearSelectorTimmer && clearTimeout(this.clearSelectorTimmer);

		this.selector = attrs.search ? character: this.selector + character;

		for (let i = 0; i < options.length; i ++) {
			if (this.matchOptionLabel(options[i].label, this.selector)) {
				this.selectedIndex = i;
				break;
			}
		}

		this.clearSelectorTimmer =
			!attrs.search && setTimeout( this.clearSelector.bind(this), SELECTOR_RESET_INTERVAL);
	}

	incSelectedIndex (options) {
		this.downKeyPress = true;
		this.selectedIndex ++;

		if (this.selectedIndex === options.length) {
			this.selectedIndex = 0;
		}
	}

	decSelectedIndex (options) {
		this.downKeyPress = false;
		this.selectedIndex --;

		if (this.selectedIndex === -1) {
			this.selectedIndex = options.length - 1;
		}
	}

	captureKeyPress (attrs, e) {
		if ([SPACE, ENTER, ESC, UP_KEY, DOWN_KEY].indexOf(e.keyCode) !== -1 ||
				e.keyCode >= 65 && e.keyCode <= 90 ||
				e.keyCode >= 48 && e.keyCode <= 57) {

			if (!this.active && [ENTER, ESC, SPACE].indexOf(e.keyCode) === -1) {
				this.toggleActive(e);
				e.preventDefault();
				return;
			}

			if (e.keyCode === ESC) {
				this.hideDropdown(e);
			}
			else if (e.keyCode == UP_KEY) {
				this.decSelectedIndex(attrs.options);
			}
			else if (e.keyCode == DOWN_KEY) {
				this.incSelectedIndex(attrs.options);
			}
			else if (e.keyCode === SPACE) {
				this.toggleActive(e);
			}
			else if (e.keyCode === ENTER) {
				let {options, model} = attrs;
				this.selectOption(this.selectedIndex, options[this.selectedIndex].value, model, e);
				this.hideDropdown(e);
			}
			else if (attrs.search) {
				return;
			}
			else {
				this.setSelector(attrs, e.key);
			}

			e.preventDefault();
			return;
		}
		e.redraw = false;
	}

	selectOption (index, value, model, e) {
		let modelValue;
		if (this.multiple) {
			modelValue = model();
			modelValue.push(value);
		}
		else {
			modelValue = value;
		}
		model.setAndValidate(modelValue);
		this.selectedIndex = index;
		this.selector = "";
		e.preventDefault();
	}

	getProcessedOptions (attrs) {
		let index = 0;
		let anOptionSelected = false;

		return attrs.options.map((option) => {
			let itemAttrs =
				{ "data-value": option.value
				, onmousedown: this.selectOption.bind(this, index, option.value, attrs.model)
				};

			if (this.selectedIndex === index) {
				itemAttrs.selected = true;
				anOptionSelected = true;
			}

			if (attrs.model() === option.value) {
				itemAttrs.active = true;
			}

			if (attrs.search &&
					this.selector &&
					!this.matchOptionLabel(option.label, this.selector)) {
				itemAttrs.filtered = true;
			}

			if (attrs.multiple && attrs.model().indexOf(option.value) != -1) {
				itemAttrs.filtered = true;
			}

			index ++;
			return o(DropdownItem, itemAttrs, option.label);
		});
	}

	updateSearchText (attrs, e) {
		let el = e.target || e.srcElement;
		this.setSelector(attrs, el.value);
		e.preventDefault();
	}

	view ({attrs, children, state}) {
		const isSelection = this.isSelection(attrs);
		const text = this.getText(attrs);
		if (attrs.multiple && !issArray(attrs.model())) {
			throw new Error("Model value must be array.");
		}

		return o("div", attrs.rootAttrs,
			isSelection?
				o("input", {type: "hidden", name: attrs.name || "", value: attrs.model()})
				: null,

			o(DropdownText,
				{ default: this.isDefaultText(attrs, text)
				, filtered: attrs.search && this.selector? true: false
				},
				text),

			attrs.multiple
				? attrs.model().map((sel) => {
					let item = firstMatch((attrs.options), (option) => {
						return option.value === sel;
					});
					return o(SelectedItem, {model: attrs.model, item: item});
				})
				: null,

			o(Icon, {name: "dropdown"}),

			attrs.search
				? o("input.search[tabindex=0][autocomplete=off]",
						{ value: this.selector
						, oninput: this.updateSearchText.bind(this, attrs) })
				: null,

			o(DropdownMenu, {visible: this.active},
				isSelection
					? this.getProcessedOptions(attrs)
					: children));
	}
}


export class DropdownText extends UI {
	getClassList ({attrs}) {
		return [
				attrs.default && "default",
				attrs.filtered && "filtered",
				"text"
			];
	}
}


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


export class DropdownItem extends UI {
	getClassList ({attrs}) {
		return [
			attrs.active && "active",
			attrs.selected && "selected",
			attrs.filtered && "filtered",
			"item"
		];
	}
}
