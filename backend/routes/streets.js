const express = require('express');
const { z } = require('zod');
const { PrismaClient } = require('@prisma/client');
const streetSchema = require('../schemas/streetSchema');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const parsedData = streetSchema.parse(req.body);

    const street = await prisma.street.create({
      data: {
        name: parsedData.name,
        condominiumId: parsedData.condominiumId,
      },
    });

    res.json(street);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Erro ao validar os dados", errors: error.errors });
    }
    res.status(500).json({ message: "Impossível adicionar rua ao condomínio" });
  }
});

router.get('/', async (req, res) => {
  try {
    const streets = await prisma.street.findMany({
      include: { lots: true }
    });
    res.json(streets);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar ruas" });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const street = await prisma.street.findUnique({
      where: { id: parseInt(id) },
      include: { lots: true }
    });

    if (!street) return res.status(404).json({ message: "Rua não encontrada" });
    res.json(street);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar rua" });
  }
});

router.get('/condominium/:condominiumId', async (req, res) => {
  const { condominiumId } = req.params;
  try {
    const streets = await prisma.street.findMany({
      where: { condominiumId: parseInt(condominiumId) },
      include: { lots: true }
    });

    if (streets.length === 0) return res.status(404).json({ message: "Nenhuma rua encontrada para o condomínio" });
    res.json(streets);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar ruas para o condomínio" });
  }
});

module.exports = router;