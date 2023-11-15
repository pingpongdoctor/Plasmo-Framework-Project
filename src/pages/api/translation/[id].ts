import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { connectMongoDB } from "../../../../lib/databaseConnect";
import { TranslationModel } from "../../../../mongo/schema";

interface Data {
  message: string;
}

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method != "DELETE" && req.method != "PUT") {
    return res.status(405).json({
      message: "Unable to send " + req.method + " request to server...",
    });
  }

  const { id } = req.query;
  console.log(id);
  if (!id) {
    return res.status(400).json({
      message: "Required data is missing in the request body",
    });
  }

  if (req.method == "DELETE") {
    try {
      await connectMongoDB();

      await TranslationModel.deleteOne({ _id: id });
      res.status(200).json({
        message: "translation is deleted",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: `Internal Server Error: ${error}`,
      });
    }
  }

  if (req.method == "PUT") {
    try {
      await connectMongoDB();
      const { from, to, originalContent, translatedContent } = req.body;

      if (!from || !to || !originalContent || !translatedContent) {
        return res.status(400).json({
          message: "Required data is missing in the request body",
        });
      }

      await TranslationModel.updateOne(
        { _id: id },
        { from, to, originalContent, translatedContent }
      );
      res.status(200).json({
        message: "translation is updated",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: `Internal Server Error: ${error}`,
      });
    }
  }
});
