# Explanation of Validation Functions for Songs

This document explains the purpose and functionality of each validation function used for songs in the application.

## 1. `checkNameAndArtist`

This function validates the presence of the song name and artist in the request body.

- **Purpose**: Ensures that both the name and artist fields are provided before proceeding with song creation or update.
- **Functionality**: If either the name or artist field is missing, it sends a 400 Bad Request response with an error message. Otherwise, it allows the request to proceed to the next middleware.

## 2. `checkAlbum`

This function validates the length of the album title provided in the request body.

- **Purpose**: Ensures that the album title is of sufficient length for proper identification.
- **Functionality**: If the length of the album title is less than or equal to 2 characters, it sends a 400 Bad Request response with an error message. Otherwise, it allows the request to proceed to the next middleware.

## 3. `checkTime`

This function validates the length of the time field provided in the request body.

- **Purpose**: Ensures that the time field has a valid length for the song's duration.
- **Functionality**: If the length of the time field is not exactly 4 or 5 characters, it sends a 400 Bad Request response with an error message. Otherwise, it allows the request to proceed to the next middleware.

## 4. `checkBoolean`

This function validates the is_favorite field to ensure it is a boolean value.

- **Purpose**: Ensures that the is_favorite field has a valid boolean value.
- **Functionality**: It checks if the is_favorite field is either the string "true", "false", or a boolean value. If it's not, it sends a 400 Bad Request response with an error message. Otherwise, it allows the request to proceed to the next middleware.
