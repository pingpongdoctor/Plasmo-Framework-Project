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

  connectMongoDB();
  try {
    const data: TranslateData = req.body;
    const translatedText: string = await translateFunc(
      data.text,
      data.from,
      data.to
    );
    res.status(200).json({
      message: translatedText,
    });
  } catch (error) {
    console.log(error);
    res.status(405).json({
      message: `${error}`,
    });
  }
  disconnectMongoDB();
}
