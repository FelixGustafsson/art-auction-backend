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

    server.get("/api/items/user/:id", async (req, res) => {
        try {
            const items = await itemModel.find({ seller: req.params.id });
            items ? res.status(200).json(items) : res.json({ message: "You have no saved auctions" });
        } catch (error) {
            res.status(500).json({ message: "Unknown error" });
        }
    })

    server.post("/api/item", async (req, res) => {
        try {
            console.log(req.body, req.session);
            const item = new itemModel({
                title: req.body.title,
                description: req.body.description,
                artist: req.body.artist,
                startingBid: req.body.startingBid,
                image: req.body.image,
                auctionEnds: new Date(req.body.auctionEnds),
                seller: req.session.login,
                location: req.body.location,
                period: req.body.period,
                type: req.body.type,
            });

            if (item) {
                const result = await item.save();
                console.log(result);
                res.status(201).json({ message: "Successfully created item" });
            } else {
                res.status(400).json({ message: "Invalid item" });
            }
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