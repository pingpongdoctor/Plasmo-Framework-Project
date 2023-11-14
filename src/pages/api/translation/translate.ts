import type { NextApiRequest, NextApiResponse } from "next";
import { translateFunc } from "../../../../lib/translateFunction";
import Cors from "cors";

const cors = Cors({
  origin: "*",
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

interface Data {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors);

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
}
