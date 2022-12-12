const searchUrl = require('../printSearchResults');
describe('searchUrl', () => {
    it('testi call', () => {
        let testi = "Jaws"
        let url = `https://api.themoviedb.org/3/search/multi?api_key=ffbef3b4a61b4f7178a8fe83e0ad8b9d&language=en-US&query=${testi}&page=1&include_adult=false`
        let currentPage = 1;
        let Amount = 10;
        expect(searchUrl(url, Amount)).not.toBeNull();
    });
});