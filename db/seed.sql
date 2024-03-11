-- db/seed.sql
\c songs_dev;

INSERT INTO songs (name, artist, album, is_favorite) VALUES
('raspberry beret', 'Prince and the Revolution', 'Around the World in a Day', true),
('Don"t touch my hair', 'Solange', 'A Seat at the Table', true),
('Bad Habit', 'Steve Lacy', 'Gemini Rights', false);