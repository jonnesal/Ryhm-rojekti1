# Ryhmäprojektin WTW README.md

### Projektin tekijät: Matias Lindblom, Jeremias Ahonen, Jonne Salli ja Emil Munne

# Projektin kuvaus

Jos et tiedä, mitä haluat katsoa, voit käyttää tuotettamme löytämään vaivattomasti itsellesi sopivan elokuvan tai sarjan. Tärkeimmät ominaisuudet ovat:
- Luettelo, joka näyttää korkealle arvioidut elokuvat/sarjat valitsemiesi vaihtoehtojen perusteella
- Vaihtoehtoja, joista voit valita itseä kiinnostavat, joka näyttää sinulle vastaustesi perusteella luettelon elokuvista tai sarjoista
- Ruletti, joka arpoo elokuvan tai sarjan valitsemiesi vaihtoehtojen perusteella


# Asennuksen alkuvaiheet

Avaa Git Bash haluamaasi hakemistoon ja syötä komento: 

```git clone https://github.com/jonnesal/Ryhmaprojekti1.git```

Avaa haluamasi terminaali projektin sisään mihin syötät komennon ```npm install```
	


# Käytetyt paketit

- body-parser
- cors
- express
- mysql
- path
- nodemon
# Serverin käynnistys

Serveri käynnistyy komennolla:
 ```npm run startexp```

Jonka jälkeen pystytään kommunikoimaan serverin kanssa


# Setup for database 

Ensiksi sun pitää rakentaa tietokanta, jonka rakenne sijaitsee sql/database.sql
Sen jälkeen pitää mennä muuttamaan Js/databaseConnection.js tiedot oman tietokannan salasanalla sekä käyttäjänimellä

```js
module.exports = {
    credentials: {
        host: "localhost",
        user: "YourUsername",
        password: "YourPassword",
        database: "moseDB"
    }
}
```


## Database structure

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