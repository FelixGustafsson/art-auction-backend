import itemModel from "../models/itemModel.js";

export default function items(server) {
    server.get("/api/items", async (req, res) => {
        const items = await itemModel.find();
        res.json(items);
    })

    server.post("/api/item", async (req, res) => {
        try {
            const item = new itemModel({
                title: req.body.title,
                description: req.body.description,
                artist: req.body.artist,
                startingBid: req.body.startingBid,
                image: req.body.image,
                auctionEnds: new Date(req.body.auctionEnds),
                locationFilter: req.body.locationFilter,
                periodFilter: req.body.periodFilter,
                typeFilter: req.body.typeFilter,
            });
            if (item) {
                const result = await item.save();
            } else {
                res.status(400).json({ message: "Invalid item" });
            }

            res.status(201).json({ message: "Successfully created item" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })
}