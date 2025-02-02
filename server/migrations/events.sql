CREATE TABLE IF NOT EXISTS event_types (
    event_type_id SERIAL PRIMARY KEY,
    event_type_name VARCHAR,
    event_type_color VARCHAR
);

CREATE TABLE IF NOT EXISTS events (
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR,
    event_start_date TIMESTAMPTZ,
    event_end_date TIMESTAMPTZ,
    event_description TEXT,
    event_type_id INTEGER,
    FOREIGN KEY (event_type_id) REFERENCES event_types (event_type_id)
);

-- Default event types
INSERT INTO event_types (event_type_id, event_type_name, event_type_color)
VALUES (1, 'Order', '#fca5a5')
ON CONFLICT (event_type_id) DO NOTHING;

INSERT INTO event_types (event_type_id, event_type_name, event_type_color)
VALUES (2, 'Reservation', '#d8b4fe')
ON CONFLICT (event_type_id) DO NOTHING;

CREATE OR REPLACE FUNCTION get_events(
    _start_date TIMESTAMPTZ,
    _end_date TIMESTAMPTZ
)
RETURNS TABLE(
    event_id INTEGER, 
    event_name VARCHAR, 
    event_start_date TIMESTAMPTZ, 
    event_end_date TIMESTAMPTZ, 
    event_description TEXT,
    event_type_id INTEGER,
    event_type_name VARCHAR,
    event_type_color VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        e.event_id, 
        e.event_name, 
        e.event_start_date, 
        e.event_end_date, 
        e.event_description, 
        e.event_type_id, 
        et.event_type_name, 
        et.event_type_color
    FROM events e
    JOIN event_types et ON e.event_type_id = et.event_type_id
    WHERE e.event_start_date >= _start_date 
    AND e.event_start_date <= _end_date
    ORDER BY e.event_start_date ASC;
END;
$$;

CREATE OR REPLACE FUNCTION create_event(
    _event_name VARCHAR,
    _event_start_date TIMESTAMPTZ,
    _event_end_date TIMESTAMPTZ,
    _event_description TEXT,
    _event_type_id INTEGER
)
RETURNS TABLE(
    event_id INTEGER,
    event_name VARCHAR, 
    event_start_date TIMESTAMPTZ, 
    event_end_date TIMESTAMPTZ, 
    event_description TEXT,
    event_type_id INTEGER,
    event_type_name VARCHAR,
    event_type_color VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
    _new_event_id INTEGER;
BEGIN
    INSERT INTO 
        events (event_name, event_start_date, event_end_date, event_description, event_type_id)
    VALUES
        (_event_name, _event_start_date, _event_end_date, _event_description, _event_type_id)
    RETURNING events.event_id INTO _new_event_id;
    
    RETURN QUERY
    SELECT e.event_id, e.event_name, e.event_start_date, e.event_end_date, e.event_description, e.event_type_id, et.event_type_name, et.event_type_color
    FROM events e
    JOIN event_types et ON e.event_type_id = et.event_type_id
    WHERE e.event_id = _new_event_id;
END;
$$;

CREATE OR REPLACE FUNCTION delete_event(_event_id INTEGER)
RETURNS TABLE(
    event_id INTEGER, 
    event_name VARCHAR, 
    event_start_date TIMESTAMPTZ, 
    event_end_date TIMESTAMPTZ, 
    event_description TEXT,
    event_type_id INTEGER,
    event_type_name VARCHAR,
    event_type_color VARCHAR
)
LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM events e WHERE e.event_id = _event_id;
    RETURN QUERY
    SELECT e.event_id, e.event_name, e.event_start_date, e.event_end_date, e.event_description, e.event_type_id, et.event_type_name, et.event_type_color
    FROM events e
    JOIN event_types et ON e.event_type_id = et.event_type_id
    WHERE e.event_id = _event_id;
END;
$$;

CREATE OR REPLACE FUNCTION update_event(_event_id INTEGER, _event_name VARCHAR, _event_start_date TIMESTAMPTZ, _event_end_date TIMESTAMPTZ, _event_description TEXT, _event_type_id INTEGER)
RETURNS TABLE(
    event_id INTEGER, 
    event_name VARCHAR, 
    event_start_date TIMESTAMPTZ, 
    event_end_date TIMESTAMPTZ, 
    event_description TEXT,
    event_type_id INTEGER,
    event_type_name VARCHAR,
    event_type_color VARCHAR
)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE events e SET event_name = _event_name, event_start_date = _event_start_date, event_end_date = _event_end_date, event_description = _event_description, event_type_id = _event_type_id WHERE e.event_id = _event_id;
    RETURN QUERY
    SELECT e.event_id, e.event_name, e.event_start_date, e.event_end_date, e.event_description, e.event_type_id, et.event_type_name, et.event_type_color
    FROM events e
    JOIN event_types et ON e.event_type_id = et.event_type_id
    WHERE e.event_id = _event_id;
END;
$$;

CREATE OR REPLACE FUNCTION get_event_types()
RETURNS TABLE(
    event_type_id INTEGER,
    event_type_name VARCHAR,
    event_type_color VARCHAR
)
LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY SELECT * FROM event_types;
END;
$$;

CREATE OR REPLACE FUNCTION create_event_type(_event_type_name VARCHAR, _event_type_color VARCHAR)
RETURNS TABLE(
    event_type_id INTEGER,
    event_type_name VARCHAR,
    event_type_color VARCHAR
)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO event_types (event_type_name, event_type_color) VALUES (_event_type_name, _event_type_color);
    RETURN QUERY SELECT * FROM event_types et WHERE et.event_type_id = currval('event_types_event_type_id_seq');
END;
$$;

CREATE OR REPLACE FUNCTION delete_event_type(_event_type_id INTEGER)
RETURNS TABLE(
    success BOOLEAN,
    message TEXT
)
LANGUAGE plpgsql AS $$
DECLARE
    event_count INTEGER;
    type_exists BOOLEAN;
BEGIN
    -- Check if event type exists
    SELECT EXISTS(SELECT 1 FROM event_types WHERE event_type_id = _event_type_id) INTO type_exists;
    
    IF NOT type_exists THEN
        RETURN QUERY SELECT 
            FALSE::BOOLEAN,
            'Event type not found'::TEXT;
        RETURN;
    END IF;

    -- Check if event type is in use
    SELECT COUNT(*) INTO event_count FROM events WHERE event_type_id = _event_type_id;
    
    IF event_count > 0 THEN
        RETURN QUERY SELECT 
            FALSE::BOOLEAN,
            ('Cannot delete event type: ' || event_count || ' events are using this type')::TEXT;
        RETURN;
    END IF;

    -- If not in use, delete it
    DELETE FROM event_types WHERE event_type_id = _event_type_id;
    
    RETURN QUERY SELECT 
        TRUE::BOOLEAN,
        'Event type deleted successfully'::TEXT;
END;
$$;
