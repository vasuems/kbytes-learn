CREATE TABLE names (name TEXT);
INSERT INTO names VALUES ('John'), ('Joan'), ('Jane');
SELECT name FROM names WHERE name LIKE 'Jo%';
