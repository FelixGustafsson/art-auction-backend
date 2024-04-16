import bidModel from "../models/bidModel.js";

export default function bids(server) {
  server.get("/api/bids", async (req, res) => {
    const bids = await bidModel.find();
        res.json(bids);
  })

  server.get("/api/bids/:id", async (req, res) => {
    try { 
      if (req.body.user) {
      const bids = await bidModel.find({bidder: id});
      res.json(bids);
    }
    else if (req.body.item) {
      const bids = await bidModel.find({item: id});
      res.json(bids);
    }
    else {
      res.status(404).json({message: 'The request does not specify whether bids are required for a user or an item.'})
    }
    }
    catch {
      res.status(500).json({ message: err.message });
    }
  })

  server.post("/api/bids", async (req, res) => {
    const bid = new bidModel({
      amount: req.body.amount,
      bidder: req.session.login,
      item: req.body.item,
      date: new Date(),
    });
      try {
        const result = await bid.save();
        res.status(201).json({message: 'Bid successfully placed.'});
      }
      catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
}
