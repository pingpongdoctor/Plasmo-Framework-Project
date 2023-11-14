import { Types } from "mongoose";

export interface Translation {
  from: string;
  to: string;
  originalContent: string;
  translatedContent: string;
  user: Types.ObjectId;
}

export interface User {
  name: string;
  authId: string;
  email: string;
  translations: Types.ObjectId[];
}
