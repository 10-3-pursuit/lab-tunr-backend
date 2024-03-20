DROP DATABASE IF EXISTS songs_dev;
CREATE DATABASE songs_dev;

\c songs_dev;

CREATE TABLE playlists (
  id SERIAL PRIMARY Key,
  name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE songs (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 artist TEXT NOT NULL,
 genre TEXT,
 song_duration TEXT,
 is_favorite BOOLEAN,
 playlist_id INTEGER REFERENCES playlists (id)
);

