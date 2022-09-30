CREATE TABLE User
(
  user_ID INT NOT NULL,
  username VARCHAR(40) NOT NULL,
  password VARCHAR(40) NOT NULL,
  PRIMARY KEY (user_ID)
);

CREATE TABLE Favorite
(
  favorite_ID INT NOT NULL,
  name VARCHAR(40) NOT NULL,
  rating FLOAT NOT NULL,
  date DATE NOT NULL,
  imageURL VARCHAR(100) NOT NULL,
  user_ID INT NOT NULL,
  PRIMARY KEY (favorite_ID),
  FOREIGN KEY (user_ID) REFERENCES User(user_ID)
);

CREATE TABLE History
(
  history_ID INT NOT NULL,
  imageURL VARCHAR(100) NOT NULL,
  name VARCHAR(40) NOT NULL,
  date DATE NOT NULL,
  based VARCHAR(40) NOT NULL,
  user_ID INT NOT NULL,
  PRIMARY KEY (history_ID),
  FOREIGN KEY (user_ID) REFERENCES User(user_ID)
);