// import { z } from 'zod';

// export const SCH_signup = z.object({
//     name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
//     email: z.string().email("Formato de email inválido"),
//     password: z.string().min(5, "A senha deve ter pelo menos 5 caracteres"),
//     role: z.enum(["admin", "user"]).refine(val => val === "admin" || val === "user", {
//         message: "O valor do role deve ser 'admin' ou 'user'",
//     }),
// });

// export type SCH_signup_Props = z.infer<typeof SCH_signup>;

// helpers/schemas/sign.zod.schema.ts

import { z } from 'zod';

export const SCH_signup = z.object({
    full_name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Formato de email inválido"),
    password: z.string().min(5, "A senha deve ter pelo menos 5 caracteres"),
    confirmPassword: z.string().min(5, "A confirmação de senha deve ter pelo menos 5 caracteres"),
    role: z.enum(["admin", "user"]).default("user"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], 
});

export type SCH_signup_Props = z.infer<typeof SCH_signup>;


