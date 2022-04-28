import { NextApiRequest, NextApiResponse } from "next";

import type { User } from "./user";
import { sessionOptions } from "lib/session";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username } = await req.body;

  try {
    const user: User = {
      isLoggedIn: true, 
      login: username,
    };
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}