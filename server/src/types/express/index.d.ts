import { UserDocument } from "../../models/userModel.ts"; // Adjust path to your model

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}
