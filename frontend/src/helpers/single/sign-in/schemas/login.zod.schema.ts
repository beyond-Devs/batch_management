import { z } from 'zod';

export const SCH_login = z.object({
    email: z.string().email("Formato de email invalido"),
    password: z.string().optional(),
});


export type SCH_login_Props = z.infer<typeof SCH_login>