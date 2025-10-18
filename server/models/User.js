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
        required: function() {
            return !this.googleId; // Required only if not a Google user
        }
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true, 
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
    },
    verified: { 
        type: Boolean,
        default: false 
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User