import { z } from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password too long"),
});

export type loginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password too long"),
    confirmPassword: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password too long"),
})

export type registerSchema = z.infer<typeof registerSchema>;