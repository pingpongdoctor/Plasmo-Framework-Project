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
    await connectMongoDB();

    const {
      from,
      to,
      originalContent,
      translatedContent,
    }: DataToAddTranslation = req.body;

    if (!from || !to || !originalContent || !translatedContent) {
      return res.status(400).json({
        message: "Required data is missing in the request body",
      });
    }

    await Translation.create({
      from,
      to,
      originalContent,
      translatedContent,
    });
    res.status(201).json({ message: "New translation has been added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  } finally {
    disconnectMongoDB();
  }
}
