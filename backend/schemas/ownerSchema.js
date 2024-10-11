const { z } = require('zod');

const ownerSchema = z.object({
  full_name: z.string().min(1, "Nome do proprietário é obrigatório"),
  contact: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
});

module.exports = ownerSchema;