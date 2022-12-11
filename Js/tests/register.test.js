const testRegister = require("../register");

test("Should be able to register account", () => {
  const testdata = {
    fname: "testacc",
    lname: "testacc",
    username: "testacc",
    password: "testpass",
  };

  let response = testRegister(testdata);
  expect(response).toBe("true");
});
