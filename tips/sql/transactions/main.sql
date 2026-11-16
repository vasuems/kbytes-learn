CREATE TABLE accounts (id INTEGER, balance REAL)
INSERT INTO accounts VALUES (1, 100)
INSERT INTO accounts VALUES (2, 200)
BEGIN TRANSACTION
UPDATE accounts SET balance = 90 WHERE id = 1
UPDATE accounts SET balance = 210 WHERE id = 2
ROLLBACK
SELECT * FROM accounts
