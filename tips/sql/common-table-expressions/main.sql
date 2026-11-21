WITH daily_sales AS (
    SELECT '2023-10-01' AS date, 100 AS sales
    UNION ALL
    SELECT '2023-10-02', 150
    UNION ALL
    SELECT '2023-10-03', 200
)
SELECT
    strftime('%Y-%m', date) AS month,
    SUM(sales) AS total_sales
FROM daily_sales
GROUP BY month;
