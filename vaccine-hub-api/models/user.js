const db = require("../db");
const bcrypt = require("bcrypt");
const {BCRYPT_WORK_FACTOR} = require("../../config");
const {UnauthorizedError, BadRequestError} = require("../utils/errors");

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
        // User should submit email, password
        const requiredFields = ["email", "password", "first_name", "last_name", "location", "date"];
        // Error: if any fields are missing
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`);
            }
        })

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email");
        }
        
        // Error: if user with same email already exists
        const existingUser = await User.fetchUserByEmail(credentials.email);
        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`);
        }

        // Take user password and hash it
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR);

        // Take user email and lowercase it
        const lowerCasedEmail = credentials.email.toLowerCase();

        // Create new user in database with all their info
        const result = await db.query(`
            INSERT INTO users (
                email,
                password,
                first_name,
                last_name,
                location,
                date
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, email, first_name, last_name, location, date;
        `, [lowerCasedEmail, hashedPassword, credentials.first_name, credentials.last_name, credentials.location, credentials.date])
        // Return user
        const user = result.rows[0];

        return user;
    }

    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided");
        }

        const query = `SELECT * FROM users WHERE email = $1`;

        const result = await db.query(query, [email.toLowerCase()]);

        const user = result.rows[0];

        return user;
    }

}

module.exports = User;