const { z } = require('zod');

const occupancySchema = z.object({
  lot_id: z.number().min(1, "O ID do lote é obrigatório."),
  owner_id: z.number().min(1, "O ID do proprietário é obrigatório."),
  occupancy_date: z.date().optional(),
  userId: z.number().optional(),
});

module.exports = occupancySchema;