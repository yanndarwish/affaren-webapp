CREATE OR REPLACE FUNCTION create_product(
    _name VARCHAR(255),
    _price DOUBLE PRECISION,
    _taxe DOUBLE PRECISION,
    _quantity INT,
    _barcode VARCHAR(255)
)
RETURNS TABLE (
    product_id INT,
    product_supplier_id INT,
    product_name VARCHAR(50),
    product_price NUMERIC(6, 2),
    product_taxe DOUBLE PRECISION,
    product_quantity INT,
    product_barcode VARCHAR(20),
    product_alert INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO 
        products (product_name, product_price, product_taxe, product_quantity, product_barcode)
    VALUES
        (_name, _price, _taxe, _quantity, _barcode);
    RETURN QUERY
    SELECT * FROM products p WHERE p.product_id = LASTVAL();
END;
$$;

CREATE OR REPLACE FUNCTION update_product_quantity(
    _id INT,
    _quantity INT
)
RETURNS TABLE (
    product_id INT,
    product_quantity INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE products p SET product_quantity = p.product_quantity - _quantity WHERE p.product_id = _id;
    RETURN QUERY SELECT * FROM products p WHERE p.product_id = _id;
END;
$$;
