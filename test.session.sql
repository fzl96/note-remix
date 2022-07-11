-- @block
CREATE TABLE Users (
  id INT PRIMARY AUTO_INCREMENT,
  name VARCHAR(255),
  email VARCHAR(255),
  bio TEXT,
  country CHAR(2)
);