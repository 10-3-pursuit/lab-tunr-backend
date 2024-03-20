DROP DATABASE IF EXISTS tunes;
CREATE DATABASE tunes;

\c tunes;

-- Create playlists table
CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);


CREATE TABLE songs (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 artist TEXT NOT NULL,
 album TEXT,
 time TEXT,
 is_favorite BOOLEAN,
 playlist_id INTEGER REFERENCES playlists (id) ON DELETE CASCADE);



-- -- Add a foreign key constraint to songs table
-- ALTER TABLE songs
-- ADD COLUMN playlist_id INT REFERENCES playlists(playlist_id);


