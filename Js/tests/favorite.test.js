const testFavorite = require('../favorite');
const loginbefore = require('../login');




//Logins before doing any tests
beforeAll(() => {
    loginbefore("testacc", "testpass");
});


test("Movie/series should be able to be added in to the database", () => {

    const data = {
        "name": "testi",
        "rate": 8.0,
        "posterpath": "testi",
        "test": true

    }

    let response = testFavorite(1, data);
    expect(response).toBe('true')


})


test("Movie/series should be able to be removed from the database", () => {

    let response = testFavorite(2, "testi");
    expect(response).toBe('true')

})