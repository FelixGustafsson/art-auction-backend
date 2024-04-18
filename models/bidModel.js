import mongoose from "mongoose";

const bidSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    bidder: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const bidModel = mongoose.model('Bid', bidSchema)
export default bidModel;