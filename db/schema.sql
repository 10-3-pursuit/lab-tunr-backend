DROP DATABASE IF EXISTS tuner_dev;
CREATE DATABASE tuner_dev;

\c tuner_dev;

CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE songs (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 album TEXT,
 time TEXT,
 artist TEXT NOT NULL,
 is_favorite BOOLEAN,
 playlist_id INTEGER REFERENCES playlists (id)
);
