import { z } from "zod";

export const visaSchema = z.object({
    url: z.url().min(1, "Upload file to continue")
});

export type visaFormValues = z.infer<typeof visaSchema>;