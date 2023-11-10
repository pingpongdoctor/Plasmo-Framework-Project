import type { NextApiRequest, NextApiResponse } from "next";
import {
  connectMongoDB,
  disconnectMongoDB,
} from "../../../lib/databaseConnect";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method != "POST") {
    return res.status(405).json({
      message: "Unable to send " + req.method + " request to server...",
    });
  }
  try {
    connectMongoDB();
    return res.status(200).json({
      message: "MongoDB connected",
    });
  } catch (error) {
    console.log(error);
    return res.status(405).json({
      message: "Error connecting MongoDB",
    });
  }
}
