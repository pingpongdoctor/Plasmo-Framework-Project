import type { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../../../../mongo/schema";
import {
  connectMongoDB,
  disconnectMongoDB,
} from "../../../../lib/databaseConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(405).json({
      message: "Unable to send " + req.method + " request to server...",
    });
  }

  try {
    await connectMongoDB();
    const { email, name, auth0Id } = req.body;

    console.log(email, name, auth0Id);

    if (!email || !name || !auth0Id) {
      return res.status(400).json({
        message: "Required data is missing in the request body",
      });
    }

    const foundUser = await UserModel.findOneAndUpdate(
      { auth0Id },
      { email, name, auth0Id },
      {
        upsert: true,
        new: true,
      }
    );

    console.log(foundUser);

    res.status(200).json({
      message: "user is updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Internal Server Error: ${error}`,
    });
  } finally {
    disconnectMongoDB();
  }
}
