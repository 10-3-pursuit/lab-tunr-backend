\c songs_dev;

INSERT INTO songs (name, artist, genre, song_duration, is_favorite, playlist_id)
VALUES
('Hey Ya!', 'OutKast', 'Hip Hop/R&B', '4:10', true, NULL),
('Beautiful', 'Christina Aguilara', 'Pop', '3:59', false, 2),
('In Da Club', '50 Cent', 'Hip Hop/Rap', '3:13', true, NULL),
('Complicated', 'Avril Lavigne', 'Pop Punk', '4:04', false, 2),
('Bye Bye Bye', 'NSYNC', 'Pop', '3:20', true, 2),
('Bohemian Rhapsody', 'Queen', 'Rock', '5:55', false, 1),
('Rolling in the Deep', 'Adele', 'Soul/Pop', '3:48', true, 2),
('Smells Like Teen Spirit', 'Nirvana', 'Grunge', '5:01', false, NULL),
('Hotel California', 'Eagles', 'Rock', '6:30', true, 1),
('Billie Jean', 'Michael Jackson', 'Pop', '4:54', true, 2),
('Sweet Child o Mine', 'Guns N Roses', 'Hard Rock', '5:55', false, 1),
('Wonderwall', 'Oasis', 'Alternative Rock', '4:18', true, 1),
('Livin on a Prayer', 'Bon Jovi', 'Rock', '4:09', false, 1),
('Like a Rolling Stone', 'Bob Dylan', 'Rock', '6:13', true, 1),
('Imagine', 'John Lennon', 'Pop Rock', '3:03', false, NULL),
('I Will Always Love You', 'Whitney Houston', 'Soul/R&B', '4:31', false, NULL),
('Bohemian Like You', 'The Dandy Warhols', 'Indie Rock', '3:31', true, NULL),
('Mr. Brightside', 'The Killers', 'Indie Rock', '3:42', true, NULL),
('Shape of My Heart', 'Sting', 'Soft Rock', '4:38', false, 1),
('Dont Stop Believin', 'Journey', 'Rock', '4:10', true, 1);

INSERT INTO playlists (name, description)
VALUES
('Rockin Good Time', 'All the good rock songs.'),
('Poppin Good Time', 'All the good pop songs.');