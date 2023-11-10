import type { NextApiRequest, NextApiResponse } from "next";
import {
  connectMongoDB,
  disconnectMongoDB,
} from "../../../../lib/databaseConnect";
import { translateFunc } from "../../../../lib/translateFunction";

interface Data {
  message: string;
}

export default async function handler(
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
    const { text, from, to }: TranslateData = req.body;

    if (!text || !from || !to) {
      return res.status(400).json({
        message: "Required data is missing in the request body",
      });
    }

    const translatedText: string = await translateFunc(text, from, to);
    res.status(200).json({
      message: translatedText,
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
