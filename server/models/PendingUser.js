import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,  // ✅ Creates index automatically
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    verificationCode: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 }  // ✅ TTL index - this is fine
    }
}, {
    timestamps: true
});

const PendingUser = mongoose.model("PendingUser", pendingUserSchema);
export default PendingUser;
