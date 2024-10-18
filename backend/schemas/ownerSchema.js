const { z } = require('zod');

const ownerSchema = z.object({
  full_name: z.string().min(1, "O nome do proprietário é obrigatório."),
  contact: z.string().min(1, "O contacto do proprietário é obrigatório."),
  email: z.string().optional(),
});

module.exports = ownerSchema;