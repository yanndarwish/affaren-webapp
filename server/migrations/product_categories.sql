CREATE TABLE IF NOT EXISTS product_categories (
    product_category_id SERIAL PRIMARY KEY,
    product_category_name VARCHAR,
    product_category_color VARCHAR
);

ALTER TABLE products
ADD COLUMN IF NOT EXISTS product_category_id INTEGER;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_product_category'
    ) THEN
        ALTER TABLE products
        ADD CONSTRAINT fk_product_category
        FOREIGN KEY (product_category_id)
        REFERENCES product_categories (product_category_id);
    END IF;
END $$;

ALTER TABLE sales_products
ADD COLUMN IF NOT EXISTS product_category_id INTEGER;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_product_category'
    ) THEN
        ALTER TABLE sales_products
        ADD CONSTRAINT fk_product_category
        FOREIGN KEY (product_category_id)
        REFERENCES product_categories (product_category_id);
    END IF;
END $$;

ALTER TABLE cards
ADD COLUMN IF NOT EXISTS product_category_id INTEGER;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'fk_card_product_category'
    ) THEN
        ALTER TABLE cards
        ADD CONSTRAINT fk_card_product_category
        FOREIGN KEY (product_category_id)
        REFERENCES product_categories (product_category_id);
    END IF;
END $$;

-- Default product categories
INSERT INTO product_categories (product_category_id, product_category_name, product_category_color)
VALUES (1, 'Shop Food', '#fca5a5')
ON CONFLICT (product_category_id) DO NOTHING;

INSERT INTO product_categories (product_category_id, product_category_name, product_category_color)
VALUES (2, 'Shop Deco', '#cbd5e1')
ON CONFLICT (product_category_id) DO NOTHING;

INSERT INTO product_categories (product_category_id, product_category_name, product_category_color)
VALUES (3, 'Coffee', '#fde68a')
ON CONFLICT (product_category_id) DO NOTHING;

INSERT INTO product_categories (product_category_id, product_category_name, product_category_color)
VALUES (4, 'Bakery', '#f9a8d4')
ON CONFLICT (product_category_id) DO NOTHING;

INSERT INTO product_categories (product_category_id, product_category_name, product_category_color)
VALUES (5, 'Restaurant', '#a5f3fc')
ON CONFLICT (product_category_id) DO NOTHING;

CREATE OR REPLACE FUNCTION get_product_categories()
RETURNS TABLE(
    product_category_id INTEGER,
    product_category_name VARCHAR,
    product_category_color VARCHAR
) AS $$
BEGIN
    RETURN QUERY SELECT * FROM product_categories;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_product_categories_by_id(
    _product_category_id INTEGER
)
RETURNS TABLE(
    product_category_id INTEGER,
    product_category_name VARCHAR,
    product_category_color VARCHAR
) AS $$
BEGIN
    RETURN QUERY SELECT * FROM product_categories WHERE product_category_id = _product_category_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_product_category(
    _product_category_name VARCHAR,
    _product_category_color VARCHAR
)
RETURNS TABLE(
    product_category_id INTEGER,
    product_category_name VARCHAR,
    product_category_color VARCHAR
) AS $$
DECLARE
    _product_category_id INTEGER;
BEGIN
    INSERT INTO product_categories (product_category_name, product_category_color)
    VALUES (_product_category_name, _product_category_color)
    RETURNING product_categories.product_category_id INTO _product_category_id;

    RETURN QUERY SELECT * FROM product_categories WHERE product_category_id = _product_category_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_product_category(
    _product_category_id INTEGER,
    _product_category_name VARCHAR,
    _product_category_color VARCHAR
)
RETURNS TABLE(
    product_category_id INTEGER,
    product_category_name VARCHAR,
    product_category_color VARCHAR
) AS $$
BEGIN
    UPDATE product_categories 
    SET 
        product_category_name = _product_category_name,
        product_category_color = _product_category_color
    WHERE product_category_id = _product_category_id;

    RETURN QUERY SELECT * FROM product_categories WHERE product_category_id = _product_category_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_product_category(
    _product_category_id INTEGER
)
RETURNS VOID AS $$
BEGIN
    DELETE FROM product_categories 
    WHERE product_category_id = _product_category_id;
END;
$$ LANGUAGE plpgsql;
