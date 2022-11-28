describe("Movies/series favorites", () => {

    it("Movie/series should be able to be added in to the database", () => {
        let response = putToFavorite("testi", 8.0, "testi");
        expect(response).toBe('true')




    })



});