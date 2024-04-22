import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    title: String,
    description: String,
    artist: String,
    startingBid: Number,
    image: String,
    auctionEnds: String,
    location: String,
    period: String,
    type: String,
    seller: { type: mongoose.Schema.Types.ObjectId, required: true }
});

const itemModel = mongoose.model('items', itemSchema);

export default itemModel;