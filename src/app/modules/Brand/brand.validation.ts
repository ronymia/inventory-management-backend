import { z } from "zod";
import { status } from "./brand.constant";

const createBrandZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Brand name is required",
    }),
    description: z.string({
      required_error: "Brand description is required",
    }),
    email: z.string({
      required_error: "Brand email is required",
    }),
    location: z.string({
      required_error: "Brand location is required",
    }),
    products: z.array({
      required_error: "Product is required",
    }),
    suppliers: z.array({
      required_error: "Supplier is required",
    }),
    status: z.array([...status] as [string, ...string[]], {
      required_error: "Status is required",
    }),
  }),
});

const updateBrandZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Brand name is required",
      })
      .optional(),
    description: z
      .string({
        required_error: "Brand description is required",
      })
      .optional(),
    email: z
      .string({
        required_error: "Brand email is required",
      })
      .optional(),
    location: z
      .string({
        required_error: "Brand location is required",
      })
      .optional(),
    products: z
      .array({
        required_error: "Product is required",
      })
      .optional(),
    suppliers: z
      .array({
        required_error: "Supplier is required",
      })
      .optional(),
    status: z
      .array([...status] as [string, ...string[]], {
        required_error: "Status is required",
      })
      .optional(),
  }),
});

export const BrandZodValidation = {
  createBrandZodSchema,
  updateBrandZodSchema,
};
