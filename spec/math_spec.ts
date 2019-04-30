import { add, subtract, multiply } from "../src/math";

describe('the math module', () => {
    it('can do addition', () => {
        expect(add(2, 2)).toBe(4)
    });
    it('can do subtration', () => {
        expect(subtract(10, 2)).toBe(8);
    });
    it('can do multiplication', () => {
        expect(multiply(3, 3)).toBe(9);
    });
});