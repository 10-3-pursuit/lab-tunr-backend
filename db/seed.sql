-- db/seed.sql
\c tunes;

-- Insert sample playlists
INSERT INTO playlists (name, description) VALUES
('Workout Mix', 'Playlist for energizing workouts'),
('Chill Vibes', 'Playlist for relaxing evenings');

INSERT INTO songs (playlist_id, name, artist, album, time, is_favorite) VALUES
('1', 'Raspberry Beret', 'Prince and the Revolution', 'Around the World in a Day', '3:42', true),
('2','Don`t touch my hair', 'Solange', 'A Seat at the Table', '4:17', true),
('1','Bad Habit', 'Steve Lacy', 'Gemini Rights', '3:29', false);





