import bidModel from "../models/bidModel.js";

export default function bids(server) {
  server.post("/api/bids", async (req, res) => {
    const bid = new bidModel({
      amount: req.body.amount,
      bidder: session.login,
      item: req.body.item,
      date: new Date(),
    });
    const result = await bid.save();
    console.log(result);
  });
}
