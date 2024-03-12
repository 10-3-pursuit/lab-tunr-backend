DROP DATABASE IF EXISTS tunes;
CREATE DATABASE tunes;

\c tunes;

CREATE TABLE songs (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 artist TEXT NOT NULL,
 album TEXT,
 time TEXT,
 is_favorite BOOLEAN
);




