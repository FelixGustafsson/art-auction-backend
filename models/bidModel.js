import mongoose from "mongoose";
import User from "./userModel.js";

const bidSchema = mongoose.Schema({
    amount: Number,
    bidder: {type: mongoose.Schema.Types.ObjectId},
//    item: {type: Schema.Types.ObjectId, ref: 'items'},
    date: Date
})

const Bid = mongoose.model('Bid', bidSchema)
export default Bid;