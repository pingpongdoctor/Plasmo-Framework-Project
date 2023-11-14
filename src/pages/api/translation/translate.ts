import type { NextApiRequest, NextApiResponse } from "next";
import { translateFunc } from "../../../../lib/translateFunction";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

interface Data {
  message: string;
}

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method != "POST") {
    return res.status(405).json({
      message: "Unable to send " + req.method + " request to server...",
    });
  }

  try {
    const { text, from, to }: DataToRetrieveTranslation = req.body;

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
  }
});
