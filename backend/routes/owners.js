const express = require('express');
const { z } = require('zod');
const { PrismaClient } = require('@prisma/client');
const ownerSchema = require('../schemas/ownerSchema');

const router = express.Router(); 
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    try {
        const parsedData = ownerSchema.parse(req.body);
        const owner = await prisma.owner.create({
            data: parsedData,
        });
        res.json(owner);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json(error.errors);
        }
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

router.get('/', async (req, res) => {
    try {
        const owners = await prisma.owner.findMany();
        res.json(owners);
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const owner = await prisma.owner.findUnique({
            where: { id: parseInt(id) }
        });

        if (!owner) return res.status(404).json({ message: "Proprietário não encontrado" });
        res.json(owner);
    } catch (error) {
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

module.exports = router;