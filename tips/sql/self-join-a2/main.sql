CREATE TABLE employees (
  name TEXT,
  salary INTEGER
);
INSERT INTO employees VALUES ('John', 50000);
INSERT INTO employees VALUES ('Jane', 50000);
INSERT INTO employees VALUES ('Bob', 60000);
SELECT e1.name, e2.name
FROM employees e1
JOIN employees e2
ON e1.salary = e2.salary
AND e1.name < e2.name;
