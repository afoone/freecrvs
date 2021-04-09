import { add, list } from "../../../services/auth";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      const user = await add(req.body);
      res.json(user);
      break;

    default:
      const users = await list();
      res.json(users);
      break;
  }
};
