import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().nonempty("Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters")
        .max(32, "Password must be at most 32 characters")
        .refine(data => /[a-z]/.test(data), "Must contain at least one lowercase letter")
        .refine(data => /[A-Z]/.test(data), "Must contain at least one uppercase letter")
        .refine(data => /\d/.test(data), "Must contain at least one number")
        .refine(data => /[@#$!%*&_+-]/.test(data), "Must contain at least one special character (@#$!%*&_+-)"),
});

export const registerSchema = z.object({
    username: z.string().nonempty("Username is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
        .max(32, "Password must be at most 32 characters")
        .refine(data => /[a-z]/.test(data), "Must contain at least one lowercase letter")
        .refine(data => /[A-Z]/.test(data), "Must contain at least one uppercase letter")
        .refine(data => /\d/.test(data), "Must contain at least one number")
        .refine(data => /[@#$!%*&_+-]/.test(data), "Must contain at least one special character (@#$!%*&_+-)")
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;

export type AuthFormValues = LoginFormValues | RegisterFormValues;