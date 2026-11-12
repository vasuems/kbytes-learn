CREATE TABLE users
(
  name TEXT,
  city TEXT
);
INSERT INTO users VALUES ('John', 'NY');
INSERT INTO users VALUES ('Jane', 'LA');
SELECT name, city FROM users
WHERE city = 'NY';
