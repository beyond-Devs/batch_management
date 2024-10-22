const express = require('express');
const { z } = require('zod');
const { PrismaClient } = require('@prisma/client');
const occupancySchema = require('../schemas/occupancySchema');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const parsedData = occupancySchema.parse(req.body);
    const occupancy = await prisma.occupancy.create({
      data: parsedData,
    });
    res.status(201).json(occupancy);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get('/', async (req, res) => {
  try {
    const occupancies = await prisma.occupancy.findMany({
      include: {
        lot: true, 
        owner: true 
      }
    });
    res.json(occupancies);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar ocupações" });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const occupancy = await prisma.occupancy.findUnique({
      where: { id: parseInt(id) },
      include: {
        lot: true, 
        owner: true 
      }
    });

    if (!occupancy) return res.status(404).json({ message: "Ocupação não encontrada" });
    res.json(occupancy);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar ocupação" });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const parsedData = occupancySchema.parse(req.body);
    const updatedOccupancy = await prisma.occupancy.update({
      where: { id: parseInt(id) },
      data: parsedData,
    });

    res.json(updatedOccupancy);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ message: "Erro ao atualizar ocupação" });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.occupancy.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar ocupação" });
  }
});

module.exports = router;