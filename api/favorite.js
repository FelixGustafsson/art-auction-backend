import favoriteModel from "../models/favoriteModel.js";
import itemModel from "../models/itemModel.js";

export default function favorites(server) {
    server.post("/api/favorite", async (req, res) => {
        console.log(req.session.login)
        try {
            const favorite = new favoriteModel({
                item: req.body.item,
                user: req.body.user,
            });
            const result = await favorite.save();

            if (result) {
                res.status(201).json({ message: "Successfully added to favorites" });
            } else {
                res.status(400).json({ message: "Error adding to favorites" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    server.get("/api/favorites/:id", async (req, res) => {
        try {
            let favoriteItems = []
            const userFavorites = await favoriteModel.find({ user: req.params.id });
            for (const favorite of userFavorites) {
                const item = await itemModel.findById(favorite.item)
                favoriteItems.push(item)
            }
            res.status(200).send(favoriteItems);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    server.delete("/api/favorite/:id", async (req, res) => {
        try {
            const favoriteToDelete = await favoriteModel.findOne({ item: req.params.id, user: req.session.login });
            const result = await favoriteModel.deleteOne({ _id: favoriteToDelete._id });
            if (result.deletedCount === 1) {
                res.status(200).json({ message: "Successfully deleted favorite" });
            } else {
                res.status(404).json({ message: "Favorite not found" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })
}