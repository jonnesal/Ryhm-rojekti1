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