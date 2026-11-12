CREATE TABLE pets (name TEXT, kind TEXT);
INSERT INTO pets VALUES ('Rex', 'dog'), ('Tom', 'cat'), ('Bo', 'dog');
SELECT kind, COUNT(*) FROM pets GROUP BY kind ORDER BY kind;
