import {window} from "./../utils.js";
import {
	Card,
	card,
	cards,
	subCard,
	cardContent,
	cardHeader,
	cardMeta,
	cardDescription,
	cardAuthor,
	cardTime,
	cardCategory,
} from "./../../src/components/card.js";

import chai from "chai";

let expect = chai.expect;

describe("card", () => {
	describe("getClassList", () => {
		let vnode;
		beforeEach(() => {
			vnode = {
				attrs: {},
				children: [],
				state: {}
			};
		});

		it("includes 'ui'", () => {
			let classList = card.getClassList(vnode);
			expect(classList.join(" ")).to.contain("ui");
		});

		it("includes 'fluid'", () => {
			vnode.attrs.fluid = true;
			let classList = card.getClassList(vnode);
			expect(classList.join(" ")).to.contain("fluid");
		});

		it("includes 'centered'", () => {
			vnode.attrs.centered = true;
			let classList = card.getClassList(vnode);
			expect(classList.join(" ")).to.contain("centered");
		});

		it("includes 'raised'", () => {
			vnode.attrs.raised = true;
			let classList = card.getClassList(vnode);
			expect(classList.join(" ")).to.contain("raised");
		});

		it("includes 'link'", () => {
			vnode.attrs.link = true;
			let classList = card.getClassList(vnode);
			expect(classList.join(" ")).to.contain("link");
		});

		it("includes 'card'", () => {
			let classList = card.getClassList(vnode);
			expect(classList.join(" ")).to.contain("card");
		});

		it("includes proper color", () => {
			vnode.attrs.color = "red";
			let classList = card.getClassList(vnode);
			expect(classList.join(" ")).to.contain("red");
		});
	});

	describe("view", () => {
		let vnode;

		beforeEach(() => {
			vnode = {
				attrs: {
					rootAttrs: {}
				},
				children: [],
				state: {}
			};
		});

		it("sets tag to 'a' if 'attrs.href' exists.", () => {
			vnode.attrs.href = "#";
			let vdom = card.view(vnode);
			expect(vdom.tag).to.equal("a");
		});

		it("sets tag to 'div' if 'attrs.href' does not exist.", () => {
			let vdom = card.view(vnode);
			expect(vdom.tag).to.equal("div");
		});
	});
});


describe("subCard", () => {
	let vnode;

	beforeEach(() => {
		vnode = {
			attrs: {},
			children: [],
			state: {}
		};
	});

	it("extends Card", () => {
		expect(subCard instanceof Card).to.equal(true);
	});

	describe("getClassList", () => {
		it("excludes 'ui'", () => {
			let classList = subCard.getClassList(vnode);
			expect(classList.join(" ")).to.not.contain("ui");
		});
	});
});


describe("cards", () => {
	describe("getClassList", () => {
		let vnode;
		beforeEach(() => {
			vnode = {
				attrs: {},
				children: [],
				state: {}
			};
		});

		it("includes 'ui'", () => {
			let classList = cards.getClassList(vnode);
			expect(classList.join(" ")).to.contain("ui");
		});

		it("includes 'link'", () => {
			vnode.attrs.link = true;
			let classList = cards.getClassList(vnode);
			expect(classList.join(" ")).to.contain("link");
		});

		it("includes 'stackable'", () => {
			vnode.attrs.stackable = true;
			let classList = cards.getClassList(vnode);
			expect(classList.join(" ")).to.contain("stackable");
		});

		it("includes 'doubling'", () => {
			vnode.attrs.doubling = true;
			let classList = cards.getClassList(vnode);
			expect(classList.join(" ")).to.contain("doubling");
		});

		it("includes proper count", () => {
			vnode.attrs.cardCount = "3";
			let classList = cards.getClassList(vnode);
			expect(classList.join(" ")).to.contain("three");
		});

		it("includes 'card'", () => {
			let classList = cards.getClassList(vnode);
			expect(classList.join(" ")).to.contain("cards");
		});
	});
});


describe("carContent", () => {
	describe("getClassList", () => {
		let vnode;

		beforeEach(() => {
			vnode = {
				attrs: {},
				children: [],
				state: {}
			};
		});

		it("includes 'extra'", () => {
			vnode.attrs.extra = true;
			let classList = cardContent.getClassList(vnode);
			expect(classList.join(" ")).to.contain("extra");
		});

		it("includes proper float", () => {
			vnode.attrs.float = "left";
			let classList = cardContent.getClassList(vnode);
			expect(classList.join(" ")).to.contain("left floated");
		});

		it("includes 'content'", () => {
			let classList = cardContent.getClassList(vnode);
			expect(classList.join(" ")).to.contain("content");
		});
	})
});


describe("cardHeader", () => {
	describe("getClassList", () => {
		let vnode;

		beforeEach(() => {
			vnode = {
				attrs: {},
				children: [],
				state: {}
			};
		});

		it("includes proper float", () => {
			vnode.attrs.float = "left";
			let classList = cardHeader.getClassList(vnode);
			expect(classList.join(" ")).to.contain("left floated");
		});


		it("includes 'header'", () => {
			let classList = cardHeader.getClassList(vnode);
			expect(classList.join(" ")).to.contain("header");
		});
	});

	describe("view", () => {
		let vnode;

		beforeEach(() => {
			vnode = {
				attrs: {
					rootAttrs: {}
				},
				children: [],
				state: {}
			};
		});

		it("sets tag to 'a' if 'attrs.href' exists.", () => {
			vnode.attrs.href = "#";
			let vdom = card.view(vnode);
			expect(vdom.tag).to.equal("a");
		});

		it("sets tag to 'div' if 'attrs.href' does not exist.", () => {
			let vdom = card.view(vnode);
			expect(vdom.tag).to.equal("div");
		});
	});
});


describe("cardMeta", () => {
	describe("getClassList", () => {
		let vnode;

		beforeEach(() => {
			vnode = {
				attrs: {},
				children: [],
				state: {}
			};
		});

		it("includes proper float", () => {
			vnode.attrs.float = "left";
			let classList = cardMeta.getClassList(vnode);
			expect(classList.join(" ")).to.contain("left floated");
		});


		it("includes 'meta'", () => {
			let classList = cardMeta.getClassList(vnode);
			expect(classList.join(" ")).to.contain("meta");
		});
	});
});


describe("cardDescription", () => {
	describe("getClassList", () => {
		let vnode;

		beforeEach(() => {
			vnode = {
				attrs: {},
				children: [],
				state: {}
			};
		});

		it("includes proper float", () => {
			vnode.attrs.float = "left";
			let classList = cardDescription.getClassList(vnode);
			expect(classList.join(" ")).to.contain("left floated");
		});


		it("includes 'description'", () => {
			let classList = cardDescription.getClassList(vnode);
			expect(classList.join(" ")).to.contain("description");
		});
	});
});

describe("cardAuthor", () => {
	describe("getClassList", () => {
		let vnode;

		beforeEach(() => {
			vnode = {
				attrs: {},
				children: [],
				state: {}
			};
		});

		it("includes proper float", () => {
			vnode.attrs.float = "left";
			let classList = cardAuthor.getClassList(vnode);
			expect(classList.join(" ")).to.contain("left floated");
		});


		it("includes 'description'", () => {
			let classList = cardAuthor.getClassList(vnode);
			expect(classList.join(" ")).to.contain("author");
		});
	});
});

describe("cardTime", () => {
	describe("getClassList", () => {
		let vnode;

		beforeEach(() => {
			vnode = {
				attrs: {},
				children: [],
				state: {}
			};
		});

		it("includes proper float", () => {
			vnode.attrs.float = "left";
			let classList = cardTime.getClassList(vnode);
			expect(classList.join(" ")).to.contain("left floated");
		});


		it("includes 'description'", () => {
			let classList = cardTime.getClassList(vnode);
			expect(classList.join(" ")).to.contain("time");
		});
	});
});


describe("cardCategory", () => {
	describe("getClassList", () => {
		let vnode;

		beforeEach(() => {
			vnode = {
				attrs: {},
				children: [],
				state: {}
			};
		});

		it("includes proper float", () => {
			vnode.attrs.float = "left";
			let classList = cardCategory.getClassList(vnode);
			expect(classList.join(" ")).to.contain("left floated");
		});


		it("includes 'description'", () => {
			let classList = cardCategory.getClassList(vnode);
			expect(classList.join(" ")).to.contain("category");
		});
	});
});

