const searchUrl = require('../printSearchResults');

describe('Kokeillaan että https://api.themoviedb.org query toimii ja saadaan vastaus', () => {
    it('Testataan https://api.themoviedb.org/3/search/multi?api_key=ffbef3b4a61b4f7178a8fe83e0ad8b9d&language=en-US&query=Jaws&page=1&include_adult=false', () => {
        let testi = "Jaws"
        let url = `https://api.themoviedb.org/3/search/multi?api_key=ffbef3b4a61b4f7178a8fe83e0ad8b9d&language=en-US&query=${testi}&page=1&include_adult=false`
        let Amount = 10;
        //const results = searchUrl(url, Amount, true);

        expect(searchUrl(url, Amount, true)).not.toBeNull();
        //expect(typeof results !== undefined);
    });
});

