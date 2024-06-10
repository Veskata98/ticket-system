import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a name'],
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'regular'],
        default: 'regular',
    },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
