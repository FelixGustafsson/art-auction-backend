import bidModel from "../models/bidModel.js";
import itemModel from "../models/itemModel.js";

export default function bids(server) {
  server.get("/api/bids", async (req, res) => {
    const bids = await bidModel.find();
    res.json(bids);
  });

  server.get("/api/bids/user/:id", async (req, res) => {
    try {
      // returns all bid objects
      const userBids = await bidModel.find({ bidder: req.params.id });
      if (!userBids) {
        return res.json([]);
      }
        let returnArray = [];
        const promises = userBids.map(async (bid) => {
          const item = await itemModel.findById(bid.item)
          let newObj = {bidAmount: bid.amount, itemId: bid.item, title: item.title, image: item.image}
          returnArray.push(newObj);
        })
        await Promise.all(promises);

        await res.status(200).json(returnArray); 
        //console.log(result);
          /*let highestBid = 0
          if (!bids.includes(item)) {
            bids.push({item: item, amount: bid.amount})
            highestBid = bid.amount
          }
          else if (bids.includes(item) && bid.amount > highestBid) {
            bids[bids.indexOf(item)].amount = bid.amount
            highestBid = bid.amount
          }   
          else if (bids.includes(item) && bid.amount < highestBid) {
            console.log('not highest bid')
          }
          else {
            console.log('impossible')
          }
          console.log(bids)
      }
    )
       
        console.log(bids)
        })*/

     
      
      
     /* console.log(itemIdArray)
      const highestBids = [];
      itemIdArray.forEach((id) => {

        const itemBids = userBids.filter((bid) => bid.item === id);
        let highest = [];
        itemBids.forEach((bid) => {
          if (highest.length === 0 || bid.amount > highest[0].amount) {console.log('existing: ', highest[0].amount, 'new: ', bid.amount)}
          if (highest.length === 0 || bid.amount > highest[0].amount) {
            highest.length = 0;
            highest.push(bid);
        }
        else {console.log('this bid was lower')}
      });
        console.log(highest);
        highest.forEach((bid) => highestBids.push(bid.amount));
      });
      console.log(highestBids);*/
      //bids = [...bids, {item: item, amount: bid.amount}]

      //console.log(bids)
      //res.status(200).json(highestBids);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  server.get("/api/bids/:id", async (req, res) => {
    try {
      const userBids = await bidModel.find({ bidder: req.params.id });
      const objectBids = await bidModel.find({ item: req.params.id });
      if (userBids.length > 0 && objectBids.length > 0) {
        return res
          .status(500)
          .json({
            message: "Found both a user and an object with this ID. ???",
          });
      } else if (userBids.length > 0) {
        return res
          .status(200)
          .json({
            message: "returning bids for user " + req.params.id,
            userBids: userBids,
          });
      } else if (objectBids.length > 0) {
        return res
          .status(200)
          .json({
            message: "returning bids on object " + req.params.id,
            objectBids: objectBids,
          });
      } else {
        return res
          .status(404)
          .json({ message: "No user or item with that ID found." });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

  server.post("/api/bids", async (req, res) => {
    const bid = new bidModel({
      amount: req.body.amount,
      bidder: req.session.login,
      item: req.body.item,
      date: new Date(),
    });
    try {
      const result = await bid.save();
      res.status(201).json({ message: "Bid successfully placed." });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
}
