DROP DATABASE IF EXISTS songs_dev;
CREATE DATABASE songs_dev;

\c songs_dev;

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT,
    time TEXT,
    is_favorite BOOLEAN
);

-- Data for playlists

DROP TABLE IF EXISTS playlists;

CREATE TABLE playlists (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    category TEXT,
    description TEXT,
    song_id INTEGER REFERENCES songs (id)
    ON DELETE CASCADE
);