import { z } from "zod";
import { storeStatus } from "./store.constant";

const createStoreZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Store name is required",
    }),
    description: z.string({
      required_error: "Store description is required",
    }),
    status: z.array([...storeStatus] as [string, ...string[]], {
      required_error: "Store status is required",
    }),
    manager: z.string({
      required_error: "Manager is required",
    }),
  }),
});

const updateStoreZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Store name is required",
      })
      .optional(),
    description: z
      .string({
        required_error: "Store description is required",
      })
      .optional(),
    status: z
      .array([...storeStatus] as [string, ...string[]], {
        required_error: "Store status is required",
      })
      .optional(),
    manager: z
      .string({
        required_error: "Manager is required",
      })
      .optional(),
  }),
});

export const StoreZodValidation = {
  createStoreZodSchema,
  updateStoreZodSchema,
};
