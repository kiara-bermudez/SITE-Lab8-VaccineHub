CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    password    TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    location    TEXT NOT NULL,
    date        DATE NOT NULL DEFAULT CURRENT_DATE
);