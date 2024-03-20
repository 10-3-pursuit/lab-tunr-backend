DROP DATABASE IF EXISTS songs;
CREATE DATABASE songs;

\c songs;

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    name TEXT,
    artist TEXT,
    album TEXT,
    time TEXT,
    is_favorite BOOLEAN
);

CREATE TABLE reviews (
 id SERIAL PRIMARY KEY,
 reviewer TEXT,
 title TEXT,
 content TEXT,
 rating NUMERIC,
 CHECK (rating >= 0 AND rating <= 5),
 song_id INTEGER REFERENCES songs (id)
 ON DELETE CASCADE
);