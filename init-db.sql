DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_database WHERE datname = 'todolist'
    ) THEN
        PERFORM dblink_exec('dbname=postgres', 'CREATE DATABASE todolist');
    END IF;
END $$;



