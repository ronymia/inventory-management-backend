import { USER_ROLE } from "../../enums/user";
import { User } from "./user.model";

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.find(
    { role: USER_ROLE.ADMIN },
    { user_id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.user_id ? lastAdmin?.user_id.subString(2) : undefined;
};

export const generatedAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, "0");
  let incrementedId = (Number(currentId) + 1).toString().padStart(5, "0");
  incrementedId = `A-${incrementedId + 1}`;
  return incrementedId;
};
export const findLastManagerId = async (): Promise<string | undefined> => {
  const lastManager = await User.find(
    { role: USER_ROLE.MANAGER },
    { user_id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastManager?.user_id ? lastManager?.user_id.subString(2) : undefined;
};

export const generatedManagerId = async (): Promise<string> => {
  const currentId =
    (await findLastManagerId()) || (0).toString().padStart(5, "0");
  let incrementedId = (Number(currentId) + 1).toString().padStart(5, "0");
  incrementedId = `M-${incrementedId + 1}`;
  return incrementedId;
};
export const findLastSupplierId = async (): Promise<string | undefined> => {
  const lastSupplier = await User.find(
    { role: USER_ROLE.SUPPLIER },
    { user_id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastSupplier?.user_id ? lastSupplier?.user_id.subString(2) : undefined;
};

export const generatedSupplierId = async (): Promise<string> => {
  const currentId =
    (await findLastSupplierId()) || (0).toString().padStart(5, "0");
  let incrementedId = (Number(currentId) + 1).toString().padStart(5, "0");
  incrementedId = `S-${incrementedId + 1}`;
  return incrementedId;
};
