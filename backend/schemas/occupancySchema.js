const { z } = require('zod');

const occupancySchema = z.object({
  lot_id: z.number().optional(),
  owner_id: z.number().optional(),
  userId: z.number().optional(), 
  occupancy_date: z.date().optional(),
});

module.exports = occupancySchema;