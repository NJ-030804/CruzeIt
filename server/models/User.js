
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // Password is now optional for Google OAuth users
        required: function() {
            return !this.googleId; // Required only if not a Google user
        }
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true, // Allows null values and creates index only for non-null values
    },
    role: {
        type: String,
        enum: ["owner", "user"],
        default: 'user'
    },
    image: {
        type: String,
        default: ' '
    },
    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: 'local'
    },
    phone: {
        type: String,
        default: ''
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User