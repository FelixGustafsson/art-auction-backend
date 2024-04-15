import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    title: String,
    description: String,
    artist: String,
    startingBid: Number,
    image: String,
    auctionEnds: Date,
    locationFilter: String,
    periodFilter: String,
    typeFilter: String,
});

const itemModel = mongoose.model('items', itemSchema);

export default itemModel;