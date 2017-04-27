import _ from "mithril";
import {required, within} from "validatex";
import {UI} from "./../base.js";
import {ModalPool} from "./pool.js";


const sizeMap = ["small", "large", "fullscreen"];

export class ModalHeader extends UI {
	getClassList ({attrs}) {
		return ["header"];
	}

	view ({attrs, children, state}) {
		return _("div", attrs.rootAttrs, children);
	}
}


export class ModalContent extends UI {
	attrSchema = {
		image: [required(false), within([true, false])]
	}

	getClassList ({attrs}) {
		return [
			attrs.image && "image",
			"content"
		];
	}

	view ({attrs, children, state}) {
		return _("div", attrs.rootAttrs, children);
	}
}


export class ModalActions extends UI {
	getClassList ({attrs}) {
		return [
			"actions"
		];
	}

	view ({attrs, children, state}) {
		return _("div", attrs.rootAttrs, children);
	}
}


export class Modal extends UI {
	attrSchema = {
		basic: [required(false), within([true, false])],
		size: [required(false), within(sizeMap)],
		scrolling: [required(false), within([true, false])]
	}

	remove () {
		ModalPool.shift();
	}

	onremove (vdom) {
		this.remove();
	}

	getClassList ({attrs}) {
		return [
			"ui",
			attrs.basic && "basic",
			attrs.size,
			attrs.scrolling && "scrolling",
			"modal visible active"
		];
	}

	view ({attrs, children, state}) {
		return _("div", attrs.rootAttrs, children);
	}
}
