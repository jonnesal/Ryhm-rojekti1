
global.fetch = require('node-fetch');
//Jest Mock testi
jest.mock('node-fetch', () => jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            key1: 'en',
            key2: 'hindi'
        })
    })
));

const translationFunctions = require('../translations');

describe('Kokeillaan toimiiko: fetchTranslationsFor', () => {
    it('Kokeilee että Fetch toimii ja ../lang/${newLocale}.json avulla löytyy oikea .json tiedosto', async () => {
        let newLocale = 'en';
        let newLocale2 = 'hindi';
        const result = await translationFunctions.fetchTranslationsFor(newLocale);
        const result2 = await translationFunctions.fetchTranslationsFor(newLocale2);

        expect(result).toEqual({
            key1: 'en',
            key2: 'hindi'
        });

        expect(result2).toEqual({
            key1: 'en',
            key2: 'hindi'
        });
        expect(fetch).toHaveBeenCalledWith(`../lang/${newLocale}.json`, { mode: 'no-cors' });
        expect(fetch).toHaveBeenCalledWith(`../lang/${newLocale}.json`, { mode: 'no-cors' });
    });
});