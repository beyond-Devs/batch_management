import { z } from 'zod';

export const condominiumSchema = z.object({
    name: z.string()
        .min(3, 'Nome do Condomínio deve ter pelo menos 3 caracteres')
        .refine((value) => isNaN(Number(value)), {
            message: 'Nome do Condomínio não pode conter apenas números',
        }),
    location: z.string().optional(),
});