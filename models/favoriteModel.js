import mongoose from 'mongoose';


const favoriteSchema = mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true }
});

const favoriteModel = mongoose.model('favorites', favoriteSchema);

export default favoriteModel;