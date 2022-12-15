const testLogin = require("../login");

test("Should be able to login to an account", () => {
  let response = testLogin("testacc", "testpass");
  expect(response).toBe("true");
});
