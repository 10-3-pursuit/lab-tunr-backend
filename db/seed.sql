-- db/seed.sql
\c tunes;

INSERT INTO songs (name, artist, album, time, is_favorite) VALUES
('raspberry beret', 'Prince and the Revolution', 'Around the World in a Day', '3:42', true),
('Don"t touch my hair', 'Solange', 'A Seat at the Table', '4:17', true),
('Bad Habit', 'Steve Lacy', 'Gemini Rights', '3:29', false);

