CREATE TABLE users (id INTEGER, name TEXT);
CREATE INDEX idx_name ON users (name);
INSERT INTO users VALUES (1, 'John');
INSERT INTO users VALUES (2, 'Jane');
SELECT * FROM users WHERE name = 'John';
