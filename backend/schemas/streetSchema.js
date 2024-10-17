const { z } = require('zod');

const streetSchema = z.object({
  name: z.string().min(1, "O nome da rua é obrigatório."),
  condominiumId: z.number().min(1, "O ID do condomínio é obrigatório."),
});

module.exports = streetSchema;