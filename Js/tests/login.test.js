const testLogin = require('../login');



test('Should be able to login to an account', () => {
    let response = testLogin("testacc", "testpass")
    console.log(response);
    expect(response).toBe('true')
})