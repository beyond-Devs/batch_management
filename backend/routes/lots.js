const express = require('express');
const { z } = require('zod');
const { PrismaClient } = require('@prisma/client');
const lotSchema = require('../schemas/lotSchema');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const parsedData = lotSchema.parse(req.body);

    const lot = await prisma.lot.create({
      data: {
        lot_number: parsedData.lot_number,
        street_id: parsedData.street_id,
        status: parsedData.status,
        description: parsedData.description,
      },
    });

    res.json(lot);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(error.errors);
    }
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedLot = await prisma.lot.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.json(updatedLot);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o status do lote' });
  }
});

router.get('/', async (req, res) => {
  try {
    const lots = await prisma.lot.findMany({
      include: { street: true }
    });
    res.json(lots);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar lotes' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const lot = await prisma.lot.findUnique({
      where: { id: Number(id) },
      include: { street: true }
    });

    if (!lot) return res.status(404).json({ message: "Lote não encontrado" });
    res.json(lot);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o lote' });
  }
});

module.exports = router;