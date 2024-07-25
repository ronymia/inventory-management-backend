import { z } from 'zod';

const createCategoryZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Please provide Category name',
    }),
    description: z.string({
      required_error: 'Please provide Category description',
    }),
    image_URL: z.string({
      required_error: 'Please provide a image of category',
    }),
  }),
});

const updateCategoryZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Please provide Category name',
      })
      .optional(),
    description: z
      .string({
        required_error: 'Please provide Category description',
      })
      .optional(),
    image_URL: z
      .string({
        required_error: 'Please provide a image of category',
      })
      .optional(),
  }),
});

export const CategoryZodValidations = {
  createCategoryZodSchema,
  updateCategoryZodSchema,
};
