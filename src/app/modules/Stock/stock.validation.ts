import { z } from "zod";
import { stockStatus, stockUnit } from "./stock.constant";

const createStockZodSchema = z.object({
  body: z.object({
    productId: z.string({
      invalid_type_error: "Stock ID must be string",
      required_error: "Stock ID is required",
    }),
    name: z.string({
      invalid_type_error: "Stock Name must be string",
      required_error: "Stock Name is required",
    }),
    description: z.string({
      invalid_type_error: "Description must be string",
      required_error: "Description is required",
    }),
    unit: z.enum([...stockUnit] as [string, ...string[]]),
    image_URLs: z
      .string({
        invalid_type_error: "Image url must be string",
        required_error: "Image url is required",
      })
      .option(),
    price: z.number({
      invalid_type_error: "Price must be number",
      required_error: "Price is required",
    }),
    quantity: z.number({
      invalid_type_error: "Quantity must be number",
      required_error: "Quantity is required",
    }),
    status: z.enum([...stockStatus] as [string, ...string[]]),
    category: z.string({
      invalid_type_error: "Category ID must be string",
      required_error: "Category ID is required",
    }),
    brand: z.string({
      invalid_type_error: "Brand ID must be string",
      required_error: "Brand ID is required",
    }),
    store: z.string({
      invalid_type_error: "Store ID must be string",
      required_error: "Store ID is required",
    }),
    suppliedBy: z.string({
      invalid_type_error: "Supplier ID must be string",
      required_error: "Supplier ID is required",
    }),
  }),
});
const updateStockZodSchema = z.object({
  body: z.object({
    productId: z
      .string({
        invalid_type_error: "Stock ID must be string",
        required_error: "Stock ID is required",
      })
      .option(),
    name: z
      .string({
        invalid_type_error: "Stock Name must be string",
        required_error: "Stock Name is required",
      })
      .option(),
    description: z
      .string({
        invalid_type_error: "Description must be string",
        required_error: "Description is required",
      })
      .option(),
    unit: z.enum([...stockUnit] as [string, ...string[]]),
    image_URLs: z
      .string({
        invalid_type_error: "Image url must be string",
        required_error: "Image url is required",
      })
      .option(),
    price: z
      .number({
        invalid_type_error: "Price must be number",
        required_error: "Price is required",
      })
      .option(),
    quantity: z
      .number({
        invalid_type_error: "Quantity must be number",
        required_error: "Quantity is required",
      })
      .option(),
    status: z.enum([...stockStatus] as [string, ...string[]]),
    category: z
      .string({
        invalid_type_error: "Category ID must be string",
        required_error: "Category ID is required",
      })
      .option(),
    brand: z
      .string({
        invalid_type_error: "Brand ID must be string",
        required_error: "Brand ID is required",
      })
      .option(),
    store: z
      .string({
        invalid_type_error: "Store ID must be string",
        required_error: "Store ID is required",
      })
      .option(),
    suppliedBy: z
      .string({
        invalid_type_error: "Supplier ID must be string",
        required_error: "Supplier ID is required",
      })
      .option(),
  }),
});

export const StockZodValidations = {
  createStockZodSchema,
  updateStockZodSchema,
};
