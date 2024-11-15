import * as z from "zod";

export const addTaskSchema = z.object({
  title: z.string({ message: "الحقل مطلوب" }).min(2),
  description: z.string({ message: "الحقل مطلوب" }).optional(),
  issuer: z.string({ message: "الحقل مطلوب" }).min(2),
});
