import mongoose, { Schema } from "mongoose";
import { Translations } from "./interface";

const translationSchema = new Schema<Translations>(
  {
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Translation = mongoose.model("Translation", translationSchema);
