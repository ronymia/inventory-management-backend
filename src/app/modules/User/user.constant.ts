import { USER_ROLE } from "../../enums/user";
import {
  TUserFilterableFields,
  TUserRole,
  TUserStatus,
} from "./user.interface";

export const userFilterableFields: TUserFilterableFields[] = [
  "searchTerm",
  "email",
  "phone_number",
  "role",
  "status",
  "admin",
  "manager",
  "supplier",
];

export const userRoles: TUserRole[] = [
  USER_ROLE.SUPPER_ADMIN,
  USER_ROLE.ADMIN,
  USER_ROLE.MANAGER,
  USER_ROLE.SUPPLIER,
];

export const userStatus: TUserStatus[] = [
  "active",
  "inactive",
  "in-progress",
  "block",
];
