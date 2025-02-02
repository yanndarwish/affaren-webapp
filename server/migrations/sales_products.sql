CREATE OR REPLACE FUNCTION get_sold_products(
    _date DATE,
    _type VARCHAR,
    _product_category_id INTEGER DEFAULT NULL
)
RETURNS TABLE (
    product_name VARCHAR,
    product_quantity BIGINT,
    product_id VARCHAR,
    total_price NUMERIC
) 
LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT 
        sp.product_name,
        SUM(sp.product_quantity),
        sp.product_id,
        SUM(sp.product_quantity * sp.product_price) as total_price
    FROM sales_products sp
    INNER JOIN sales s ON sp.sale_id = s.sale_id  -- Validate sale_id
    WHERE CASE _type
        WHEN 'day' THEN 
            sp.sale_year = EXTRACT(YEAR FROM _date)
            AND sp.sale_month = EXTRACT(MONTH FROM _date)
            AND sp.sale_day = EXTRACT(DAY FROM _date)
        WHEN 'month' THEN 
            sp.sale_year = EXTRACT(YEAR FROM _date)
            AND sp.sale_month = EXTRACT(MONTH FROM _date)
        WHEN 'year' THEN 
            sp.sale_year = EXTRACT(YEAR FROM _date)
        ELSE 
            FALSE
    END
    AND (_product_category_id IS NULL OR sp.product_category_id = _product_category_id)
    GROUP BY 
        sp.product_id,
        sp.product_name
    ORDER BY SUM(sp.product_quantity) DESC;
END;
$$;
