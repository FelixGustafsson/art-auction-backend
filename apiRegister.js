import users from "./api/users.js";
import bids from "./api/bids.js";
//import items from "./api/items.js";

import items from "./api/items.js";

export default function (server) {
  users(server);

  items(server);
  bids(server);
  //  items(server);
}
