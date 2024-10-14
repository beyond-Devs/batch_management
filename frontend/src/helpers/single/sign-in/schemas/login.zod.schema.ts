import { z } from 'zod';

export const SCH_login = z.object({
    email: z.string().email("Formato de email invalido"),
    password: z.string().min(5, "Senha muito curta"),
});


export type SCH_login_Props = z.infer<typeof SCH_login>