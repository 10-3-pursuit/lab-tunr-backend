
const songValidations = {
    name: {
        notEmpty: {
            errorMessage: "Name is required"
        },
        isString: true   
    },

    artist: {
        notEmpty: {
            errorMessage: "Artist is required"
        },
        isString: true   
    },

    album: {
        notEmpty: {
            errorMessage: "Album is required"
        },
        isString: true   
    },

    time: {
        notEmpty: {
            errorMessage: "Time is required"
        },
        isString: {
            errorMessage: "Time must be a string"
        }
    },

    is_favorite: {
        notEmpty: {
            errorMessage: "is_favorite is required"
        },
        isBoolean: {
            errorMessage: "is_favorite must be a boolean value"
        }
    }
};

module.exports = songValidations;

