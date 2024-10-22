const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const bcrypt = require('bcryptjs');
const userSchema = require('../schemas/userSchema');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  try {
    const parsedData = userSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(parsedData.password, 10);
    parsedData.password = hashedPassword;

    const user = await prisma.user.create({
      data: parsedData,
    });
    res.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Erro ao validar dados, verifique seus dados!", errors: error.errors });
    }
    res.status(500).json({ message: "Impossível cadastrar usuário, ou o email inserido já está cadastrado no sistema" });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) }
    });

    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário" });
  }
});

module.exports = router;