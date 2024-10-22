const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const condominiumSchema = require('../schemas/condominiumSchema');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const parsedData = condominiumSchema.parse(req.body);
    const condominium = await prisma.condominium.create({
      data: parsedData,
    });
    res.json(condominium);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get('/', async (req, res) => {
  try {
    const condominiums = await prisma.condominium.findMany({
      include: {
        streets: {
          include: {
            lots: true
          }
        }
      }
    });

    const condominiumsWithLotCount = condominiums.map(condo => ({
      ...condo,
      totalLots: condo.streets.reduce((acc, street) => acc + (street.lots?.length || 0), 0)
    }));

    res.json(condominiumsWithLotCount);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar condomínios" });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const condominium = await prisma.condominium.findUnique({
      where: { id: parseInt(id, 10) },
      include: { streets: true }
    });

    if (!condominium) {
      return res.status(404).json({ message: "Condomínio não encontrado" });
    }
    res.json(condominium);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar condomínio" });
  }
});

module.exports = router;