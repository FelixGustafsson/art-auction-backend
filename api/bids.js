import bidModel from "../models/bidModel.js";

export default function bids(server) {
  server.get("/api/bids", async (req, res) => {
    const bids = await bidModel.find();
        res.json(bids);
  })

  server.get("/api/bids/:id", async (req, res) => {
    try { 
      const userBids = await bidModel.find({bidder: req.params.id});
      const objectBids = await bidModel.find({item: req.params.id});
      if (userBids.length > 0 && objectBids.length > 0) {
        return res.status(500).json({message: 'Found both a user and an object with this ID. ???'})
      }
      else if (userBids.length > 0) {
        return res.status(200).json({message: 'returning bids for user ' + req.params.id, userBids: userBids});
      }
      else if (objectBids.length > 0) {
        return res.status(200).json({message: 'returning bids on object ' + req.params.id, objectBids: objectBids});
      }
      else {
        return res.status(404).json({message: 'No user or item with that ID found.'})
    }
    }
    catch (err) {
      return res.status(500).json({ message: err.message });
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
