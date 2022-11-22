const sum = require("./sum.js");

test("total of 5 + 6 when you run it", () => {
    expect(sum(5, 6)).toBe(11);
});