const { z } = require('zod');

const lotSchema = z.object({
  lot_number: z.number().min(1, "O número do lote é obrigatório."),
  street_id: z.number().optional(),
  status: z.enum(['Available', 'Occupied', 'Construction', 'Delivered']).optional(),
  description: z.string().optional(),
});

module.exports = lotSchema;
