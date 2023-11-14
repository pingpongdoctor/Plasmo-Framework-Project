import type { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../../../../mongo/schema";
import { User } from "../../../../mongo/interface";
import {
  connectMongoDB,
  disconnectMongoDB,
} from "../../../../lib/databaseConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return res.status(405).json({
      message: "Unable to send " + req.method + " request to server...",
    });
  }

  const { auth0Id } = req.query;

  if (!auth0Id) {
    return res.status(400).json({
      message: "Required data is missing in the request body",
    });
  }

  try {
    await connectMongoDB();
    const user: (User & { _id: string }) | null = await UserModel.findOne({
      auth0Id,
    });

    if (!user) {
      return res.status(404).json({
        message: "user is not found",
      });
    }

    return res.status(200).json({
      user,
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
