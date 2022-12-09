const testLogin = require('../login');



test('Should be able to login to an account', () => {
    let response = testLogin("rulla", "joku22")
    console.log(response);
    expect(response).toBe('true')
})