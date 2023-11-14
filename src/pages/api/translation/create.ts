import { NextApiRequest, NextApiResponse } from "next";
import {
  connectMongoDB,
  disconnectMongoDB,
} from "../../../../lib/databaseConnect";
import { TranslationModel, UserModel } from "../../../../mongo/schema";
import getUser from "../../../utils/getUser";
import { User } from "../../../../mongo/interface";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(
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

    const { from, to, originalContent, translatedContent, userId } = req.body;

    if (!from || !to || !originalContent || !translatedContent || !userId) {
      return res.status(400).json({
        message: "Required data is missing in the request body",
      });
    }

    const user: User & { _id: string } = await getUser(req, res);

    if (!user) {
      return res.status(404).json({ message: "user is not found" });
    }

    const newTranslation = await TranslationModel.create({
      from,
      to,
      originalContent,
      translatedContent,
      user: userId,
    });

    console.log(newTranslation);

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $push: { translations: newTranslation._id } },
      { new: true }
    );

    console.log(updatedUser);

    res
      .status(201)
      .json({ message: "New translation has been added to the current user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  } finally {
    disconnectMongoDB();
  }
});
