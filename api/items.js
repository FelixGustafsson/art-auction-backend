import itemModel from "../models/itemModel.js";

export default function items(server) {
    server.get("/api/items", async (req, res) => {
        const items = await itemModel.find();
        res.json(items);
    })

    server.get("/api/item/:id", async (req, res) => {
        try {
            const item = await itemModel.findById(req.params.id);
            res.json(item);
        } catch (error) {
            res.status(404).json({ message: "Item not found" });
        }

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

    server.patch("/api/item/:id", async (req, res) => {
        const { newDescription } = req.body
        try {
            const item = await itemModel.findById(req.params.id);
            if (item && newDescription.length > 0) {
                item.description = newDescription
                await item.save()
                res.status(200).json({ message: "Successfully updated description" });
            } else {
                res.status(404).json({ message: "Item not found" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })
}