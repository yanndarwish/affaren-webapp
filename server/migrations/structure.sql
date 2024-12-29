CREATE OR REPLACE FUNCTION get_cards()
RETURNS TABLE(
    card_id VARCHAR(15), 
    card_name VARCHAR, 
    card_price DOUBLE PRECISION, 
    card_taxe DOUBLE PRECISION, 
    card_type VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY 
    SELECT * FROM cards;
END;
$$;