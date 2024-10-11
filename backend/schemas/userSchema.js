const { z } = require('zod');

const userSchema = z.object({
  full_name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").max(100, "Email muito longo"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  role: z.enum(['admin', 'user']).optional(),
});

module.exports = userSchema;