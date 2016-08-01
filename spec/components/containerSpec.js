import {container} from "./../../src/components/container.js";
import chai from "chai";

let expect = chai.expect;

describe("container", () => {
	describe(".getClassList", () => {
		it("should return list where 'ui' is the first item.", () => {
			expect(container.getClassList({})[0]).to.equal("ui");
		});

		it("should return list where 'container' is the last item.", () => {
			let classList = container.getClassList({});
			expect(classList[classList.length - 1]).to.equal("container");
		});

		it("should return proper type class", () => {
			let classList = container.getClassList({type: "text"});
			expect(classList[1]).to.equal(container.typeClassMap.text);
		});

		it("should return proper alignment class", () => {
			let classList = container.getClassList({alignment: "center"});
			expect(classList[2]).to.equal(container.alignmentClassMap.center);
		});
	});
});
