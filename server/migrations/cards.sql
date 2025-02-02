-- Then modify the column
ALTER TABLE cards 
ALTER COLUMN card_id TYPE VARCHAR;

CREATE OR REPLACE FUNCTION get_cards()
RETURNS TABLE(
    card_id VARCHAR, 
    card_name VARCHAR, 
    card_price DOUBLE PRECISION, 
    card_taxe DOUBLE PRECISION, 
    card_type VARCHAR(50),
    card_uuid uuid,
    product_category_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY 
    SELECT * FROM cards;
END;
$$;

CREATE OR REPLACE FUNCTION create_card(
    _card_id VARCHAR,
    _card_name VARCHAR,
    _card_price DOUBLE PRECISION,
    _card_taxe DOUBLE PRECISION,
    _card_type VARCHAR(50),
    _product_category_id INT
)
RETURNS TABLE(
    card_id VARCHAR, 
    card_name VARCHAR, 
    card_price DOUBLE PRECISION, 
    card_taxe DOUBLE PRECISION, 
    card_type VARCHAR(50),
    card_uuid uuid,
    product_category_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO 
        cards (card_id, card_name, card_price, card_taxe, card_type, product_category_id)
    VALUES
        (_card_id, _card_name, _card_price, _card_taxe, _card_type, _product_category_id);
    RETURN QUERY
    SELECT * FROM cards c WHERE c.card_id = _card_id;
END;
$$;

CREATE OR REPLACE FUNCTION update_card(
    _card_uuid uuid,
    _card_id VARCHAR,
    _card_name VARCHAR,
    _card_price DOUBLE PRECISION,
    _card_taxe DOUBLE PRECISION,
    _card_type VARCHAR(50),
    _product_category_id INT
)
RETURNS TABLE(
    card_id VARCHAR, 
    card_name VARCHAR, 
    card_price DOUBLE PRECISION, 
    card_taxe DOUBLE PRECISION, 
    card_type VARCHAR(50),
    card_uuid uuid,
    product_category_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE cards 
    SET 
        card_id = _card_id,
        card_name = _card_name,
        card_price = _card_price,
        card_taxe = _card_taxe,
        card_type = _card_type,
        product_category_id = _product_category_id
    WHERE uuid = _card_uuid;

    RETURN QUERY
    SELECT * FROM cards c WHERE c.uuid = _card_uuid;
END;
$$;

CREATE OR REPLACE FUNCTION delete_card(_card_uuid uuid)
RETURNS void
LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM cards 
    WHERE uuid = _card_uuid;
END;
$$;