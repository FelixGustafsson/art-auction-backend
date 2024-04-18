import favoriteModel from "../models/favoriteModel";

export default function favorites(server) {
    server.post("/api/favorite", async (req, res) => {
        try {
            const favorite = new favoriteModel({
                item: req.body.item,
                user: req.session.login,
            });
            if (favorite) {
                const result = await favorite.save();
                res.status(201).json({ message: "Successfully added to favorites" });
            } else {
                res.status(400).json({ message: "Error adding to favorites" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })

    server.get("/api/favorites", async (req, res) => {
        try {
            let favoriteItems = []
            const userFavorites = await favoriteModel.find({ user: req.session.login });
            for (const favorite of userFavorites) {
                const item = await itemModel.findById(favorite.item)
                favoriteItems.push(item)
            }
            res.status(200).json(favoriteItems);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    })
}