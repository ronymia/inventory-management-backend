import mongoose from "mongoose";
import httpStatus from "http-status";
import config from "../../config";
import { USER_ROLE } from "../../enums/user";
import { IAdmin } from "../Admin/admin.interface";
import { IUser } from "./user.interface";
import {
  generatedAdminId,
  generatedManagerId,
  generatedSupplierId,
} from "./user.utils";
import { Admin } from "../Admin/admin.model";
import AppError from "../../errors/AppError";
import { User } from "./user.model";
import { IManager } from "../Manager/manager.interface";
import { Manager } from "../Manager/manager.model";
import { ISupplier } from "../Supplier/supplier.interface";
import { Supplier } from "../Supplier/supplier.model";

const createAdminIntoDB = async (
  user: IUser,
  admin: IAdmin
): Promise<IUser> => {
  //SET ROLE
  user.role = USER_ROLE.ADMIN;

  //SET DEFAULT PASSWORD
  user.password_hash = config.default_password;

  // SESSION FOR ADMIN CREATE
  let newUserData = null;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    //AUTO GENERATED INCREMENTAL ADMIN ID
    const adminId = await generatedAdminId();
    // SET ADMIN ID TO USER
    user.user_id = adminId;
    // SET ADMIN ID
    admin.id = adminId;

    // CREATE ADMIN USING MONGOOSE SESSION
    const newAdmin = await Admin.create([admin], { session });
    // IF ADMIN NOT CREATED
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Admin");
    }
    //SET ADMIN _id REFERENCE TO user.admin
    user.admin = newAdmin[0]._id;

    // CREATING USER USING MONGOOSE SESSION
    const newUser = await User.create([user], { session });
    //IF FAILED TO CREATE USER
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Admin");
    }

    // SET USER
    newUserData = newUser[0];
    // COMMIT TRANSACTION
    await session.stopTransaction();
    // END SESSION
    await session.endSession();
  } catch (error) {
    // IF ANY ERROR FIRE WHILE CREATING ADMIN OR USER. THEN SESSION WILL BE ROLL BACK
    await session.abortTransaction();
    await session.endSession();
  }
  //SESSION END FOR CREATE ADMIN

  // GETTING POPULATED USER ADMIN
  if (newUserData) {
    newUserData = await User.findOne({ user_id: newUserData.user_id }).populate(
      {
        path: "admin",
      }
    );
  }
  return newUserData;
};
const createManagerIntoDB = async (
  user: IUser,
  manager: IManager
): Promise<IUser> => {
  //SET ROLE
  user.role = USER_ROLE.MANAGER;

  //SET DEFAULT PASSWORD
  user.password_hash = config.default_password;

  // SESSION FOR MANAGER CREATE
  let newUserData = null;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    //AUTO GENERATED INCREMENTAL MANAGER ID
    const managerId = await generatedManagerId();
    // SET ADMIN ID TO USER
    user.user_id = managerId;
    // SET MANAGER ID
    manager.id = managerId;

    // CREATE MANAGER USING MONGOOSE SESSION
    const newManager = await Manager.create([manager], { session });
    // IF ADMIN NOT CREATED
    if (!newManager.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Manager");
    }
    //SET MANAGER _id REFERENCE TO user.manager
    user.manager = newManager[0]._id;

    // CREATING USER USING MONGOOSE SESSION
    const newUser = await User.create([user], { session });
    //IF FAILED TO CREATE USER
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Manager");
    }

    // SET USER
    newUserData = newUser[0];
    // COMMIT TRANSACTION
    await session.stopTransaction();
    // END SESSION
    await session.endSession();
  } catch (error) {
    // IF ANY ERROR FIRE WHILE CREATING MANAGER OR USER. THEN SESSION WILL BE ROLL BACK
    await session.abortTransaction();
    await session.endSession();
  }
  //SESSION END FOR CREATE MANAGER

  // GETTING POPULATED USER MANAGER
  if (newUserData) {
    newUserData = await User.findOne({ user_id: newUserData.user_id }).populate(
      {
        path: "manager",
      }
    );
  }
  return newUserData;
};
const createSupplierIntoDB = async (
  user: IUser,
  supplier: ISupplier
): Promise<IUser> => {
  //SET ROLE
  user.role = USER_ROLE.SUPPLIER;

  //SET DEFAULT PASSWORD
  user.password_hash = config.default_password;

  // SESSION FOR SUPPLIER CREATE
  let newUserData = null;
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    //AUTO GENERATED INCREMENTAL SUPPLIER ID
    const supplierId = await generatedSupplierId();
    // SET SUPPLIER ID TO USER
    user.user_id = supplierId;
    // SET SUPPLIER ID
    supplier.id = supplierId;

    // CREATE SUPPLIER USING MONGOOSE SESSION
    const newSupplier = await Supplier.create([supplier], { session });
    // IF SUPPLIER NOT CREATED
    if (!newSupplier.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Supplier");
    }
    //SET SUPPLIER _id REFERENCE TO user.supplier
    user.supplier = newSupplier[0]._id;

    // CREATING USER USING MONGOOSE SESSION
    const newUser = await User.create([user], { session });
    //IF FAILED TO CREATE USER
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Supplier");
    }

    // SET USER
    newUserData = newUser[0];
    // COMMIT TRANSACTION
    await session.stopTransaction();
    // END SESSION
    await session.endSession();
  } catch (error) {
    // IF ANY ERROR FIRE WHILE CREATING SUPPLIER OR USER. THEN SESSION WILL BE ROLL BACK
    await session.abortTransaction();
    await session.endSession();
  }
  //SESSION END FOR CREATE SUPPLIER

  // GETTING POPULATED USER SUPPLIER
  if (newUserData) {
    newUserData = await User.findOne({ user_id: newUserData.user_id }).populate(
      {
        path: "supplier",
      }
    );
  }
  return newUserData;
};

export const UserServices = {
  createAdminIntoDB,
  createManagerIntoDB,
  createSupplierIntoDB,
};
