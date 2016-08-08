import {field} from "../../src/components/field.js";
import powerform from "powerform";
import m from "mithril";
import chai from "chai";
import {getVdom, presence} from "./../utils.js";
import classnames from "classnames";

let expect = chai.expect;

describe("field", () => {
	describe(".getLabelPrepend", () => {
		let attrs;

		beforeEach(() => {
			attrs = {};
		});

		it("returns attrs.label if it is a text", () => {
			attrs.label = 'Username';
			let prepend = field.getLabelPrepend(attrs);
			expect(prepend.children[0]).to.equal(attrs.label);
		});

		it("returns attrs.label.text if attrs.label.prepend is true", () => {
			attrs.label = {text: 'Username', prepend: true};
			let prepend = field.getLabelPrepend(attrs);
			expect(prepend.children[0]).to.equal(attrs.label.text);
		});

		it("returns attrs.label.text if attrs.label.prepend and attrs.label.append are not set", () => {
			attrs.label = {text: 'Username'};
			let prepend = field.getLabelPrepend(attrs);
			expect(prepend.children[0]).to.equal(attrs.label.text);
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
			expect(append.children[0]).to.equal(attrs.label.text);
		});

		it("returns the attrs.help", () => {
			attrs.help = 'Username';
			let append = field.getLabelAppend(attrs);
			expect(append.children[0]).to.equal(attrs.help);
		});

		it("returns the error text", () => {
			attrs.model.error('An error.');
			let append = field.getLabelAppend(attrs);
			expect(append.children[0]).to.equal(attrs.model.error());
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
			expect(append.children[0]).to.equal(attrs.model.error());
		});
	});

	describe(".getClassList", () => {
		let attrs, form;

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

		it("returns 'field'", () => {
			let classList = field.getClassList(attrs);
			expect(classnames(classList)).to.equal("field");
		});

		it("adds 'error' if model has error", function () {
			attrs.help = "A help.";
			attrs.model.error('An error.');
			let classList = field.getClassList(attrs);
			expect(classnames(classList)).to.equal("field error");
		});

		it("does not add 'error' class if hideError set to truthy", function () {
			attrs.help = "A help.";
			attrs.hideError = true;
			attrs.model.error('An error.');
			let classList = field.getClassList(attrs);
			expect(classnames(classList)).to.equal("field");
		});

		it("adds 'inline' if attrs.isInline is true", () => {
			attrs.inline = true;
			let classList = field.getClassList(attrs);
			expect(classnames(classList)).to.equal("inline field");
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
				update: "onkeyup",
				validate: "onchange",
				input: {class: 'aClass'},
				type: 'text'
			};
		});

		it("passes attrs.input to Input component", () => {
			let vdom = getVdom(m(field, attrs));
			expect(vdom.children[1].attrs.className).to.equal("ui aClass input");
		});

		it("binds model to value of input", () => {
			attrs.model("1");
			let vdom = getVdom(m(field, attrs));
			expect(vdom.children[1].children[1].attrs.value).to.equal(attrs.model());
		});

		it("sets input's placeholder to attrs.placeholder", () => {
			let vdom = getVdom(m(field, attrs));
			expect(vdom.children[1].children[1].attrs.placeholder).to.equal(attrs.placeholder);
		});

		it("sets input's type to attrs.type", function () {
			attrs.type = "number";
			let vdom = getVdom(m(field, attrs));
			expect(vdom.children[1].children[1].attrs.type).to.equal(attrs.type);
		});

		it("updates value on attrs.update", function () {
			let vdom = getVdom(m(field, attrs));
			let input = vdom.children[1].children[1];
			input.attrs.value = "earth";
			input.attrs[attrs.update]({});
			expect(attrs.model()).to.equal("earth");
		});

		it("validates on attrs.validate", function () {
			let vdom = getVdom(m(field, attrs));
			let input = vdom.children[1].children[1];
			attrs.model("");
			attrs.model.isValid();
			input.attrs[attrs.validate]({});
			expect(attrs.model.error()).to.exist;
		});

		it("updates and validates the value if attrs.update and attrs.validate are same", function() {
			attrs.update = "onchange";

			let vdom = getVdom(m(field, attrs));
			let input = vdom.children[1].children[1];

			// for valid data
			input.attrs.value = "earth";
			input.attrs[attrs.validate]({});
			expect(attrs.model()).to.equal("earth");
			expect(attrs.model.error()).not.to.exist;
			// for invalid data
			input.attrs.value = "";
			input.attrs[attrs.validate]({});
			expect(attrs.model()).to.equal("");
			expect(attrs.model.error()).to.exist;
		});
	});
});
