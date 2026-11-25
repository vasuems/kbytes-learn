CREATE TABLE sales (id INT, amount DECIMAL(10, 2));
INSERT INTO sales (id, amount) VALUES (1, 100.00);
INSERT INTO sales (id, amount) VALUES (2, 200.00);
CREATE VIEW total_sales AS SELECT SUM(amount) FROM sales;
SELECT * FROM total_sales;
