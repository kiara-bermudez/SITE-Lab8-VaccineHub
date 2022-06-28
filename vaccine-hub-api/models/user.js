const {UnauthorizedError} = require("../utils/errors");

class User{
    static async login(credentials) {
        // User should submit email and password
        // Error: if any fields are missing

        // Look up user in database by email
        // If user found, compare submitted password with password in database
        // If match, return user
        // Error: if anything goes wrong
        throw new UnauthorizedError("Invalid email/password combo")
    }

    static async register(credentials) {
        // User should submit email, password, rsvp status
        // Error: if any fields are missing

        // Error: if user with same email already exists

        // Take user password and hash it
        // Take user email and lowercase it

        // Create new user in database with all their info
        // Return user
    }
}

module.exports = User;