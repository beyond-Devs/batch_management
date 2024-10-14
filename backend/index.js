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

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));

app.use(express.json());

// Endpoint para login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  // Retornar o usuário ao invés de uma mensagem
  res.json({ user });
});


// Endpoint para criar um usuário
app.post('/users', async (req, res) => {
  try {
    console.log(req.body); // Logando os dados recebidos
    const parsedData = userSchema.parse(req.body);
    const user = await prisma.user.create({
      data: parsedData,
    });
    res.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.errors); // Logando erros de validação
      return res.status(400).json({ message: "Erro ao validar dados, verifique seus dados!", errors: error.errors.map.ZodError.message });
    }
    res.status(500).json({ message: "Impossível cadastrar, ou o email inserido já está cadastrado no sistema" });
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

// const express = require('express');
// const cors = require('cors');
// const { z } = require('zod');
// const { PrismaClient } = require('@prisma/client');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const loginSchema = require('./schemas/loginSchema');
// const userSchema = require('./schemas/userSchema');
// const condominiumSchema = require('./schemas/condominiumSchema');
// const lotSchema = require('./schemas/lotSchema');
// const ownerSchema = require('./schemas/ownerSchema');
// const occupancySchema = require('./schemas/occupancySchema');
// const { getToken } = require('next-auth/jwt');

// const app = express();
// const prisma = new PrismaClient();
// const secret = process.env.NEXTAUTH_SECRET || '9b1aecd9f102c9823a6d536d45ff80b2e6a1c516fa01897b108b7e6f8c3f0a9e';

// // Configurando o CORS
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));

// app.use(express.json());

// // Middleware de autenticação JWT para verificar se o usuário está logado
// async function authenticate(req, res, next) {
//   const token = await getToken({ req, secret });

//   if (!token) {
//     return res.status(401).json({ message: 'Não autorizado. Faça login primeiro.' });
//   }

//   req.user = token; // Armazenar o token no request para ser usado nas rotas
//   next();
// }

// // Endpoint de login para gerar um JWT
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   // Validação dos campos
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
//   }

//   try {
//     const user = await prisma.user.findUnique({ where: { email } });
    
//     // Verificando se o usuário existe e a senha está correta
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: 'Credenciais inválidas.' });
//     }

//     // Gerando o token JWT
//     const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret, { expiresIn: '1h' });

//     // Retornando o token ao usuário
//     res.json({ token, message: 'Login bem-sucedido.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Erro interno do servidor' });
//   }
// });

// // Endpoint para criar um usuário (pode ser acessado por qualquer um)
// app.post('/users', async (req, res) => {
//   try {
//     const parsedData = userSchema.parse(req.body);

//     // Hash da senha antes de salvar no banco
//     const hashedPassword = await bcrypt.hash(parsedData.password, 10);
//     parsedData.password = hashedPassword;

//     const user = await prisma.user.create({
//       data: parsedData,
//     });
//     res.json(user);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json(error.errors);
//     }
//     res.status(500).json({ message: "Erro interno do servidor" });
//   }
// });

// // Endpoint para listar todos os usuários (protege com autenticação)
// app.get('/users', authenticate, async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

// // Endpoint para criar um condomínio (autenticado)
// app.post('/condominiums', authenticate, async (req, res) => {
//   try {
//     const parsedData = condominiumSchema.parse(req.body);
//     const condominium = await prisma.condominium.create({
//       data: parsedData,
//     });
//     res.json(condominium);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json(error.errors);
//     }
//     res.status(500).json({ message: "Erro interno do servidor" });
//   }
// });

// // Endpoint para listar todos os condomínios (não protegido)
// app.get('/condominiums', async (req, res) => {
//   const condominiums = await prisma.condominium.findMany();
//   res.json(condominiums);
// });

// // Endpoint para criar um lote (autenticado)
// app.post('/lots', authenticate, async (req, res) => {
//   try {
//     const parsedData = lotSchema.parse(req.body);
//     const lot = await prisma.lot.create({
//       data: parsedData,
//     });
//     res.json(lot);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json(error.errors);
//     }
//     res.status(500).json({ message: "Erro interno do servidor" });
//   }
// });

// // Endpoint para listar todos os lotes (não protegido)
// app.get('/lots', async (req, res) => {
//   const lots = await prisma.lot.findMany();
//   res.json(lots);
// });

// // Endpoint para criar um proprietário (autenticado)
// app.post('/owners', authenticate, async (req, res) => {
//   try {
//     const parsedData = ownerSchema.parse(req.body);
//     const owner = await prisma.owner.create({
//       data: parsedData,
//     });
//     res.json(owner);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json(error.errors);
//     }
//     res.status(500).json({ message: "Erro interno do servidor" });
//   }
// });

// // Endpoint para listar todos os proprietários (não protegido)
// app.get('/owners', async (req, res) => {
//   const owners = await prisma.owner.findMany();
//   res.json(owners);
// });

// // Endpoint para criar uma ocupação (autenticado)
// app.post('/occupancies', authenticate, async (req, res) => {
//   try {
//     const parsedData = occupancySchema.parse(req.body);
//     const occupancy = await prisma.occupancy.create({
//       data: parsedData,
//     });
//     res.json(occupancy);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json(error.errors);
//     }
//     res.status(500).json({ message: "Erro interno do servidor" });
//   }
// });

// // Endpoint para listar todas as ocupações (autenticado)
// app.get('/occupancies', authenticate, async (req, res) => {
//   const occupancies = await prisma.occupancy.findMany({
//     include: {
//       lot: true,
//       owner: true,
//       user: true,
//     },
//   });
//   res.json(occupancies);
// });

// // Inicializar o servidor
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });
