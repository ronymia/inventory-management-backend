import { Model, Types } from "mongoose";
import { USER_ROLE } from "../../enums/user";
import { IAdmin } from "../Admin/admin.interface";
import { IManager } from "../Manager/manager.interface";
import { ISupplier } from "../Supplier/supplier.interface";

export type TUserStatus = "active" | "inactive" | "in-progress" | "block";
export type TUserRole =
  | USER_ROLE.SUPPER_ADMIN
  | USER_ROLE.ADMIN
  | USER_ROLE.MANAGER
  | USER_ROLE.SUPPLIER;

export type IUser = {
  user_id: string;
  email: string;
  password_hash: string;
  phone_number: number;
  role: TUserRole;
  is_Password_reset_required: boolean;
  is_deleted: boolean;
  status: TUserStatus;
  admin?: Types.ObjectId | IAdmin;
  manager?: Types.ObjectId | IManager;
  supplier?: Types.ObjectId | ISupplier;
};

export type TUserModel = Model<IUser, {}>;

export type IUserFilters = {
  searchTerm: string;
  email: string;
  phone_number: number;
  role: string;
  status: string;
  admin: string;
  manager: string;
  supplier: string;
};

export type TUserFilterableFields =
  | "searchTerm"
  | "email"
  | "phone_number"
  | "role"
  | "status"
  | "admin"
  | "manager"
  | "supplier";
