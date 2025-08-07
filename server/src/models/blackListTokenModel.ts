import mongoose, { Schema, Document } from "mongoose";

interface IBlacklistToken extends Document {
  token: string;
  blacklistedAt: Date;
}

const blacklistTokenSchema = new Schema<IBlacklistToken>(
  {
    token: { type: String, required: true },
    blacklistedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IBlacklistToken>(
  "BlacklistToken",
  blacklistTokenSchema
);
