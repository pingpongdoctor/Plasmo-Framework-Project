import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession(req, res);

  if (!session) {
    return null;
  }

  const response = await fetch(
    `${process.env.AUTH0_BASE_URL}/api/user/${session.user.sub}`
  );

  if (!response.ok) {
    return null;
  }

  const user = await response.json();

  return user;
}
