import mongoose, { Schema } from "mongoose";
import { Translations } from "./interface";

const translationSchema = new Schema<Translations>(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    originalContent: { type: String, required: true },
    translatedContent: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Translation = mongoose.model("Translation", translationSchema);
