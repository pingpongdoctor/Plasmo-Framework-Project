import { NextApiRequest, NextApiResponse } from "next";
import {
  connectMongoDB,
  disconnectMongoDB,
} from "../../../../lib/databaseConnect";
import { Translation } from "../../../../mongo/schema";

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
    connectMongoDB();
    const { translation }: { translation: string } = req.body;

    if (!translation) {
      return res.status(400).json({
        message: "Required data is missing in the request body",
      });
    }

    const addedTranslation = Translation.create({ content: translation });
    console.log(addedTranslation);
    res.status(201).json({ message: "New translation has been added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  } finally {
    disconnectMongoDB();
  }
}
