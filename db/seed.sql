\c songs_dev

INSERT INTO songs (name, artist, album, time, is_favorite) VALUES
('Get Lucky', 'Daft Punk ft. Pharrell Williams', 'Random Access Memories', '4:08', true),
('No More Drama', 'Mary J. Blige', 'No More Drama', '4:28', false),
('Shoop', 'Salt-N-Pepa', 'Very Necessary', '4:09', true),
('Give Life Back to Music', 'Daft Punk', 'Random Access Memories', '4:35', false),
('Satta Massagana', 'The Abyssinians', 'Satta Massagana', '3:25', true);

-- Seed data for playlists

INSERT INTO playlists (name, category, description, song_id) 
VALUES
('Chill Vibes', 'Chill','Relaxing tunes for a laid-back mood', 2), -- 'No More Drama'
('90s Throwback', 'Classic 90s','Classic hits from the 90s era', 3), -- 'Shoop'
('Hip Hop Jams', 'Hip-Hop','The hottest tracks in hip hop', 3),
('Funky Grooves', 'Electronic', 'Get down with some funky beats', 4),
('Reggae Rhythms', 'Reggae','Feel the vibes with reggae music', 5);