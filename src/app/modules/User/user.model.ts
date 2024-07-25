import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, TUserModel } from "./user.interface";
import { userRoles, userStatus } from "./user.constant";
import config from "../../config";

const userSchema = new Schema<IUser, TUserModel>({
  user_id: {
    type: String,
    unique: true,
    required: [true, "Please provide user ID"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Please provide Email"],
  },
  password_hash: {
    type: String,
    required: [true, "Please provide Password"],
  },
  phone_number: {
    type: Number,
    required: [true, "Please provide Phone Number"],
  },
  role: {
    type: String,
    enum: {
      values: userRoles,
      message: "",
    },
    required: [true, "Please provide Role"],
  },
  is_Password_reset_required: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    enum: userStatus,
    default: "active",
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "Manager",
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: "Supplier",
  },
});

// PASSWORD HASHING BEFORE SAVING
userSchema.pre("save", async function (next) {
  // CONVERT TO HASH PASSWORD
  this.password_hash = await bcrypt.hash(
    this.password_hash,
    Number(config.bcrypt_salt_rounds)
  );

  // CALL NEXT PROCESS
  next();
});

// EXIST USER VERIFY
userSchema.static.isUserExist = async function (id: string) {
  return await User.findOne({ id });
};

// PASSWORD MATCH
userSchema.static.isPasswordMatch = async function (
  password: any,
  password_hash: string
) {
  return await bcrypt.compare(password, password_hash);
};

export const User = model<IUser, TUserModel>("User", userSchema);
