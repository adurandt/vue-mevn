import mongoose, { Schema } from 'mongoose';

const rolSchema = new Schema({
    name: { type: String, maxlength: 30, unique: true, required: true },
    description: { type: String, maxlength: 80 },
    status: { type: Number, default: 1 },
    createAt: { type: Date, default: Date.now }
});

const Rol = mongoose.model('rol', rolSchema);

export default Rol;