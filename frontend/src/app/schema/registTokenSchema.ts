import { z } from "zod";

export const registTokenSchema = z.object({
    name: z.string().min(1, "name is required"),
    email: z.email()
});