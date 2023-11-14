import mongoose, { Schema } from "mongoose";
import { Translation, User } from "./interface";

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    auth0Id: { type: String, required: true },
    email: { type: String, required: true },
    translations: [
      { type: Schema.Types.ObjectId, ref: "Translation", default: [] },
    ],
  },
  {
    timestamps: true,
  }
);

const translationSchema = new Schema<Translation>(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    originalContent: { type: String, required: true },
    translatedContent: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export const TranslationModel =
  mongoose.models.TranslationModel ||
  mongoose.model("Translation", translationSchema);

export const UserModel =
  mongoose.models.UserModel || mongoose.model("User", userSchema);
