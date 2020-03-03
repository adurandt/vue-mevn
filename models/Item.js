import mongoose, { Schema } from 'mongoose';

const itemSchema = new Schema({
    category: { type: Schema.ObjectId, ref: 'category' },
    code: { type: String, maxlength: 64 },
    name: { type: String, maxlength: 50, unique: true, required: true },
    description: { type: String, maxlength: 255 },
    cost: { type: Number, required: true },
    stock: { type: Number, required: true },
    status: { type: Number, default: 1 },
    createAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('item', itemSchema);

export default Item;