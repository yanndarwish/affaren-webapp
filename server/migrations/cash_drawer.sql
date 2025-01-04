CREATE OR REPLACE FUNCTION add_today_cash(
    _year INT,
    _month INT,
    _day INT,
    _amount DOUBLE PRECISION
)
RETURNS TABLE (
    year INT,
    month INT,
    day INT,
    amount DOUBLE PRECISION
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO 
        drawer (year, month, day, amount)
    VALUES
        (_year, _month, _day, _amount);
    RETURN QUERY
    SELECT d.year, d.month, d.day, d.amount 
    FROM drawer d 
    WHERE id = LASTVAL();
END;
$$;

CREATE OR REPLACE FUNCTION get_today_cash(
    _year INT,
    _month INT,
    _day INT
)
RETURNS TABLE (
    year INT,
    month INT,
    day INT,
    amount DOUBLE PRECISION
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT d.year, d.month, d.day, d.amount FROM drawer d 
        WHERE d.year = _year 
        AND d.month = _month 
        AND d.day = _day;
END;
$$;