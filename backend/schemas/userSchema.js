const { z } = require('zod');

const userSchema = z.object({
  full_name: z.string().min(1, "Nome completo é obrigatório."),
  email: z.string().email("Email inválido."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  role: z.enum(['admin', 'user']).optional(),
});

module.exports = userSchema;