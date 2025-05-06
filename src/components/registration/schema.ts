
import { z } from "zod";

// Validation schema
export const formSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب"),
  nationalId: z.string()
    .min(14, "الرقم القومي يجب أن يكون 14 رقم")
    .max(14, "الرقم القومي يجب أن يكون 14 رقم")
    .regex(/^\d+$/, "الرقم القومي يجب أن يحتوي على أرقام فقط"),
  phoneNumber: z.string().optional(),
  gender: z.enum(["male", "female"], { required_error: "النوع مطلوب" }),
  status: z.string().min(1, "الصفة مطلوبة"),
  address: z.string().optional(),
  notes: z.string().optional()
});

export type FormValues = z.infer<typeof formSchema>;
