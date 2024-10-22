const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalCondominiums = await prisma.condominium.count();
    const totalStreets = await prisma.street.count();
    const totalLots = await prisma.lot.count();
    const totalOwners = await prisma.owner.count();
    const totalOccupancies = await prisma.occupancy.count();

    const lotsPerCondominium = await prisma.lot.groupBy({
      by: ['condominiumId'],
      _count: {
        id: true,
      },
    });

    const dashboardData = {
      totalUsers,
      totalCondominiums,
      totalStreets,
      totalLots,
      totalOwners,
      totalOccupancies,
      lotsPerCondominium,
    };

    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados do dashboard" });
  }
});

module.exports = router;