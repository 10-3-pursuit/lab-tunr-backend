# Song Queries Explanation

## Overview

The provided code helps manage song records in a database. It offers functions to perform various tasks like adding, updating, deleting, and retrieving songs.

## File Structure

- `queries/songs.js`: Contains functions to work with songs in the database.
- `queries/dbConfigure.js`: Manages database connection settings.
- `songController.js`: Handles requests related to songs.

## Functions Explanation

### `getAllSongs`

- **Purpose**: Retrieves all songs from the database.
- **Why it's needed**: Helps show all songs available in the collection.

### `getFilteredSongs`

- **Purpose**: Retrieves songs filtered by their "is_favorite" status.
- **Why it's needed**: Useful for showing only favorite songs.

### `getAllSongsAscOrder` and `getAllSongsDescOrder`

- **Purpose**: Retrieves all songs ordered alphabetically (ascending or descending).
- **Why it's needed**: Helps users find songs more easily by sorting them alphabetically.

### `getOneSong`

- **Purpose**: Retrieves a single song based on its ID.
- **Why it's needed**: Useful for displaying details of a specific song.

### `createSong`

- **Purpose**: Adds a new song record to the database.
- **Why it's needed**: Lets users add new songs to the collection.

### `updateSong`

- **Purpose**: Modifies an existing song record in the database.
- **Why it's needed**: Allows users to update song details if they change.

### `deleteSong`

- **Purpose**: Removes a song record from the database.
- **Why it's needed**: Helps keep the song collection clean by deleting unwanted songs.

## Usage Tips

- Import the `songs.js` file into your application to use these functions.
- Handle errors properly to deal with issues during database operations.
- Validate input data to prevent errors and ensure data integrity.
