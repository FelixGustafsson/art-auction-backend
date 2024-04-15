import users from "./api/users.js";

import items from "./api/items.js";

export default function (server) {
  users(server);

  items(server);
}
