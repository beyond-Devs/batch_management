const { z } = require('zod');

const lotSchema = z.object({
  lot_number: z.number().int().min(1, "Número do lote é obrigatório"),
  condominium_id: z.number().optional(),
  status: z.enum(['Available', 'Occupied', 'Construction', 'Delivered']).optional(),
  description: z.string().optional(),
});

module.exports = lotSchema;