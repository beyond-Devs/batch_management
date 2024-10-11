const express = require('express');
const cors = require('cors'); 
const { z } = require('zod');
const { PrismaClient } = require('@prisma/client');
const loginSchema = require('./schemas/loginSchema')
const userSchema = require('./schemas/userSchema');
const condominiumSchema = require('./schemas/condominiumSchema');
const lotSchema = require('./schemas/lotSchema');
const ownerSchema = require('./schemas/ownerSchema');
const occupancySchema = require('./schemas/occupancySchema');

const app = express();
const prisma = new PrismaClient();

// Configurando o CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));

app.use(express.json());

// Endpoint para login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Validação dos campos
  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  // Lógica de autenticação
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Credenciais inválidas.' });
  }

  res.json({ message: 'Login bem-sucedido.' });
});


// Endpoint para criar um usuário
app.post('/users', async (req, res) => {
  try {
    const parsedData = userSchema.parse(req.body);
    const user = await prisma.user.create({
      data: parsedData,
    });
    res.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(error.errors);
    }
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Endpoint para listar todos os usuários
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Endpoint para criar um condomínio
app.post('/condominiums', async (req, res) => {
  try {
    const parsedData = condominiumSchema.parse(req.body);
    const condominium = await prisma.condominium.create({
      data: parsedData,
    });
    res.json(condominium);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(error.errors);
    }
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Endpoint para listar todos os condomínios
app.get('/condominiums', async (req, res) => {
  const condominiums = await prisma.condominium.findMany();
  res.json(condominiums);
});

// Endpoint para criar um lote
app.post('/lots', async (req, res) => {
  try {
    const parsedData = lotSchema.parse(req.body);
    const lot = await prisma.lot.create({
      data: parsedData,
    });
    res.json(lot);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(error.errors);
    }
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Endpoint para listar todos os lotes
app.get('/lots', async (req, res) => {
  const lots = await prisma.lot.findMany();
  res.json(lots);
});

// Endpoint para criar um proprietário
app.post('/owners', async (req, res) => {
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

// Endpoint para listar todos os proprietários
app.get('/owners', async (req, res) => {
  const owners = await prisma.owner.findMany();
  res.json(owners);
});

// Endpoint para criar uma ocupação
app.post('/occupancies', async (req, res) => {
  try {
    const parsedData = occupancySchema.parse(req.body);
    const occupancy = await prisma.occupancy.create({
      data: parsedData,
    });
    res.json(occupancy);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(error.errors);
    }
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Endpoint para listar todas as ocupações
app.get('/occupancies', async (req, res) => {
  const occupancies = await prisma.occupancy.findMany({
    include: {
      lot: true,
      owner: true,
      user: true,
    },
  });
  res.json(occupancies);
});

// Inicializar o servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
