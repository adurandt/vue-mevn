import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    rol: { type: Schema.ObjectId, ref: "rol" },
    gender: { type: String, maxlength: 1, required: true },
    name: { type: String, maxlength: 80, unique: true, required: true },
    username: { type: String, maxlength: 12, unique: true, required: true },
    password: { type: String, maxlength: 64, required: true },
    email: { type: String, maxlength: 80, unique: true, required: true },
    mobile: { type: String, maxlength: 20 },
    status: { type: Number, default: 1 },
    createAt: { type: Date, default: Date.now }
});

const User = mongoose.model('user', userSchema);

export default User;