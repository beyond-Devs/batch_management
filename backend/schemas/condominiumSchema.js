const { z } = require('zod');

const condominiumSchema = z.object({
  name: z.string().min(1, "O nome do condomínio é obrigatório."),
  location: z.string().optional(),
});

module.exports = condominiumSchema;