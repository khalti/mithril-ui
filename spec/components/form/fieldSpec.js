import {window, trigger} from "./../../utils.js";
import {field} from "../../../src/components/form/field.js";
import powerform from "powerform";
import _ from "mithril";
import chai from "chai";
import {getVdom, presence} from "./../../utils.js";
import classnames from "classnames";

let expect = chai.expect;

describe("field", () => {
	let vnode;

	beforeEach(() => {
		vnode = {
			attrs: {},
			children: [],
			state: {}
		};
	});

	it("complains if 'model' is absent.", () => {
		vnode.attrs.type = "type";
		expect(field.oninit.bind(vnode)).to.throw(Error);
	});

	it("complains if 'label' is absent.", () => {
		vnode.attrs.model = "model";
		expect(field.oninit.bind(vnode)).to.throw(Error);
	});

	describe(".getLabelPrepend", () => {
		it("returns attrs.label if it is a text", () => {
			let attrs = {};
			attrs.label = 'Username';
			let prepend = field.getLabelPrepend(attrs);
			expect(prepend.text).to.equal(attrs.label);
		});

		it("returns attrs.label.text if attrs.label.prepend is true", () => {
			let attrs = {};
			attrs.label = {text: 'Username', prepend: true};
			let prepend = field.getLabelPrepend(attrs);
			expect(prepend.text).to.equal(attrs.label.text);
		});

		it("returns attrs.label.text if attrs.label.prepend and attrs.label.append are not set", () => {
			let attrs = {};
			attrs.label = {text: 'Username'};
			let prepend = field.getLabelPrepend(attrs);
			expect(prepend.text).to.equal(attrs.label.text);
		});
	});

	describe(".getLabelAppend", () => {
		let attrs, root, form;

		beforeEach(() => {
			form = powerform({username: {validator: presence, default: "1"}});
			attrs = {
				model: form.username,
				placeholder: "Placeholder",
				help: "A help.",
				update: "onkeyup",
				validate: "onchange",
				input: {class: 'aClass'},
				type: 'text'
			};
		});

		it("returns attrs.label.text if attrs.label.append is true", () => {
			attrs.label = {text: 'Username', append: true};
			let append = field.getLabelAppend(attrs);
			expect(append.text).to.equal(attrs.label.text);
		});

		it("does not return the attrs.help if model has data", () => {
			attrs.help = 'A help';
			let append = field.getLabelAppend(attrs);
			expect(append).to.not.exist;
		});

		it("returns the attrs.help", () => {
			attrs.help = 'A help';
			attrs.model("");
			let append = field.getLabelAppend(attrs);
			expect(append.text).to.equal(attrs.help);
		});

		it("returns the error text", () => {
			attrs.model.error('An error.');
			let append = field.getLabelAppend(attrs);
			expect(append.text).to.equal(attrs.model.error());
		});

		it("wont return error if .hideError is true", () => {
			attrs.hideError = true;
			attrs.model.error('An error.');
			let append = field.getLabelAppend(attrs);
			expect(append).not.to.exist;
		});

		it("returns error even if help text is present", () => {
			attrs.help = "A help.";
			attrs.model.error('An error.');
			let append = field.getLabelAppend(attrs);
			expect(append.text).to.equal(attrs.model.error());
		});
	});

	describe(".getClassList", () => {
		let vnode, form;

		beforeEach(() => {
			form = powerform({username: {validator: presence, default: "1"}});
			vnode = {
				attrs: {
					model: form.username,
					placeholder: "Placeholder",
					help: "A help.",
					update: "onkeyup",
					validate: "onchange",
					input: {class: 'aClass'},
					type: 'text'
				}
			};
		});

		it("includes 'field'", () => {
			let classList = field.getClassList(vnode);
			expect(classList.join(" ")).to.contain("field");
		});

		it("adds 'error' if model has error", function () {
			vnode.attrs.help = "A help.";
			vnode.attrs.model.error('An error.');
			let classList = field.getClassList(vnode);
			expect(classnames(classList)).to.contain("field error");
		});

		it("does not add 'error' class if hideError set to truthy", function () {
			vnode.attrs.help = "A help.";
			vnode.attrs.hideError = true;
			vnode.attrs.model.error('An error.');
			let classList = field.getClassList(vnode);
			expect(classnames(classList)).to.contain("field");
		});

		it("adds 'inline' if attrs.isInline is true", () => {
			vnode.attrs.inline = true;
			let classList = field.getClassList(vnode);
			expect(classnames(classList)).to.contain("inline field");
		});
	});

	describe(".view", () => {
		let attrs, form;

		beforeEach(() => {
			form = powerform({username: {validator: presence, default: "1"}});
			attrs = {
				model: form.username,
				placeholder: "Placeholder",
				help: "A help.",
				update: "oninput",
				validate: "onchange",
				input: {class: 'aClass'},
				type: 'text',
				name: "aName"
			};
		});

		it("passes attrs.input to Input component", () => {
			_.render(document.body, _(field, attrs));
			let inputDom = document.querySelector("input");

			expect(inputDom.getAttribute("class")).to.contain("aClass");
		});

		it("binds model to value of input", () => {
			attrs.model("1");
			_.render(document.body, _(field, attrs));
			let inputDom = document.querySelector("input");

			expect(inputDom.value).to.equal(attrs.model());
		});

		it("sets input's placeholder to attrs.placeholder", () => {
			attrs.model("1");
			_.render(document.body, _(field, attrs));
			let inputDom = document.querySelector("input");

			expect(inputDom.getAttribute("placeholder")).to.equal(attrs.placeholder);
		});

		it("sets input's type to attrs.type", function () {
			attrs.type = "number";
			_.render(document.body, _(field, attrs));
			let inputDom = document.querySelector("input");

			expect(inputDom.getAttribute("type")).to.equal(attrs.type);
		});

		it("updates value on attrs.update", function () {
			_.render(document.body, _(field, attrs));
			let inputDom = document.querySelector("input");
			inputDom.value = "earth";

			trigger("input", inputDom);

			expect(attrs.model()).to.equal("earth");
		});

		it("validates on attrs.validate", function () {
			_.render(document.body, _(field, attrs));
			let inputDom = document.querySelector("input");
			inputDom.value = "";

			trigger("input", inputDom);
			trigger("change", inputDom);

			expect(attrs.model.error()).to.exist;
		});

		it("updates and validates the value if attrs.update and attrs.validate are same", function() {
			attrs.update = "onchange";

			_.render(document.body, _(field, attrs));
			let inputDom = document.querySelector("input");

			// for valid data
			inputDom.value = "earth";
			trigger("change", inputDom);
			expect(attrs.model()).to.equal("earth");
			expect(attrs.model.error()).not.to.exist;

			// for invalid data
			inputDom.value = "";
			trigger("change", inputDom);
			expect(attrs.model()).to.equal("");
			expect(attrs.model.error()).to.exist;
		});

		it("includes name", () => {
			_.render(document.body, _(field, attrs));
			let inputDom = document.querySelector("input");

			expect(inputDom.getAttribute("name")).to.equal(attrs.name);
		});
	});
});
