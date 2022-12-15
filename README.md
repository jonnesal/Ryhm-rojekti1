# Ryhmäprojektin WTW README.md

### Projektin tekijät: Matias Lindblom, Jeremias Ahonen, Jonne Salli ja Emil Munne

# Dokumentaatio

- [Jsdoc](<https://users.metropolia.fi/~jeremah/JsDoc/JsDoc%20(WTW)/global.html>)
- [Projektin dokumentaatio](https://github.com/jonnesal/Ryhmaprojekti1/blob/main/Documents/What%20To%20Watch%20dokumentaatio.pdf)
- [Projektin käyttöohje](https://github.com/jonnesal/Ryhmaprojekti1/blob/main/Documents/What%20to%20Watch%20Käyttöohje.pdf)

# Projektin kuvaus

Jos et tiedä, mitä haluat katsoa, voit käyttää tuotettamme löytämään vaivattomasti itsellesi sopivan elokuvan tai sarjan. Tärkeimmät ominaisuudet ovat:

- Etsimistoiminto, jossa voit suoraan etsiä elokuvan/sarjan nimellä
- Vaihtoehtoja, joista voit valita itseä kiinnostavat, joka näyttää sinulle vastaustesi perusteella luettelon elokuvista tai sarjoista
- Ruletti, joka arpoo elokuvan tai sarjan valitsemiesi vaihtoehtojen perusteella
- Käyttäjä spesifinen suosikkeihin laittaminen, jotta et unohda suosikki mediaasi!

# Asennuksen alkuvaiheet

Avaa Git Bash haluamaasi hakemistoon ja syötä komento:

`git clone https://github.com/jonnesal/Ryhmaprojekti1.git`

Avaa haluamasi terminaali projektin sisään mihin syötät komennon `npm install`

# Käytetyt paketit

- body-parser
- cors
- express
- mysql
- path
- nodemon
- Jest

# Serverin käynnistys

**Koulun VPN on laitettava päälle** että serveri saadaan käyntiin

Serveri käynnistyy komennolla:
`npm run startexp`

Jonka jälkeen serveri alkaa kommunikoimaan tietokannan kanssa

**(Jotta sovellus toimii on serveri laitettava päälle!)**

# Yhteys tietokantaan

Tietokanta ottaa yhteyden koulun palvelimelle, Databaseconnection.js:ssä määritetään tiedot mihin yhteys otetaan

**DatabaseConnection.js**

```js
module.exports = {
  credentials: {
    host: "10.114.34.75",
    user: "remote",
    password: "joku124",
    database: "moseDB",
  },
};
```

(Normaalisti, emme laittaisi tietokannan tietoja readme:hin, mutta tässä koulun projektissa kun muutenkin pitää olla koulun VPN se on ihan turvallista)

## Tietokanta rakenne

```shell
DROP DATABASE moseDB;
CREATE DATABASE moseDB;
use moseDB;

CREATE TABLE users
(
  user_id INT NOT NULL AUTO_INCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  user_name VARCHAR(40) NOT NULL,
  user_pass VARCHAR(40) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE Favorite
(
  favorite_ID INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(40) NOT NULL,
  rating FLOAT NOT NULL,
  date DATE NOT NULL,
  imageURL VARCHAR(100) NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (favorite_ID),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE History
(
  history_ID INT NOT NULL AUTO_INCREMENT,
  imageURL VARCHAR(100) NOT NULL,
  name VARCHAR(40) NOT NULL,
  date DATE NOT NULL,
  based VARCHAR(40) NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (history_ID),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

# Testien lokaalinen ajaminen

Testit voidaan ajaa lokaalisesti käyttämällä komentoa
`npm test`

Testeihin kuuluu:

- Suosikkeihin lisääminen ja poisto
- Kirjautuminen sekä rekisteröityminen
- Lokaalisaatio (Kielen vaihtuminen)
- Api tuloksen hakeminen

## Jenkins

Jenkinsiin pääsee kirjautumaan http://10.114.32.23:8080 **(HUOM! tähänkin tarvii olla koulun vpn)**

Testejä pääsee katsomaan käyttäjällä:

Username: testi || Password: testi123

(Normaalisti, emme laittaisi jenkins tietoja readme:hin, mutta tässä koulun projektissa kun muutenkin pitää olla koulun VPN se on ihan turvallista)
