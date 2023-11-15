import { Types } from "mongoose";

export interface Translation {
  from: "en" | "es" | "fr";
  to: "en" | "es" | "fr";
  originalContent: string;
  translatedContent: string;
  user: Types.ObjectId;
}

export interface User {
  name: string;
  auth0Id: string;
  email: string;
  translations: Types.ObjectId[];
}
