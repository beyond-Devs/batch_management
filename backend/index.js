const express = require('express');
const cors = require('cors'); 
const { z } = require('zod');
const { PrismaClient } = require('@prisma/client');
const loginSchema = require('./schemas/loginSchema');
const userSchema = require('./schemas/userSchema');
const condominiumSchema = require('./schemas/condominiumSchema');
const streetSchema = require('./schemas/streetSchema'); 
const lotSchema = require('./schemas/lotSchema');
const ownerSchema = require('./schemas/ownerSchema');
const occupancySchema = require('./schemas/occupancySchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const prisma = new PrismaClient();

const SECRET_KEY = 'aSW8zWJTlrvsN6jbDo23rSU34eDxvcdHni7S2k6M2+Y='; 

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));

app.use(express.json());

// Middleware para verificar o token
// const authenticateToken = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Token não fornecido' });

//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Token inválido' });
//     req.user = user;
//     next();
//   });
// };

// Endpoint para login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Email ou senha incorrectos' });
  }

  // Gerar o token JWT
  // const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  // res.json({ token });
  res.json({ user });
});

// Endpoint para criar um usuário
app.post('/users', async (req, res) => {
  try {
    const parsedData = userSchema.parse(req.body);

    // Hash da senha
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

// A partir daqui, todas as rotas serão protegidas pelo token
// app.use(authenticateToken);

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
  const condominiums = await prisma.condominium.findMany({
    include: { streets: true } // Incluir ruas associadas ao condomínio
  });
  res.json(condominiums);
});

// Endpoint para criar uma rua (street)
app.post('/streets', async (req, res) => {
  try {
    const parsedData = streetSchema.parse(req.body);

    const street = await prisma.street.create({
      data: parsedData,
    });

    res.json(street);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Erro ao validar os dados", errors: error.errors });
    }
    res.status(500).json({ message: "Impossível adicionar rua ao condomínio" });
  }
});

// Endpoint para listar todas as ruas
app.get('/streets', async (req, res) => {
  const streets = await prisma.street.findMany({
    include: { lots: true } // Incluir lotes associados à rua
  });
  res.json(streets);
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
  const lots = await prisma.lot.findMany({
    include: { street: true } // Incluir a rua associada ao lote
  });
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
      lot: { include: { street: true } }, // Incluir lotes e ruas
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
// const loginSchema = require('./schemas/loginSchema');
// const userSchema = require('./schemas/userSchema');
// const condominiumSchema = require('./schemas/condominiumSchema');
// const streetSchema = require('./schemas/streetSchema'); 
// const lotSchema = require('./schemas/lotSchema');
// const ownerSchema = require('./schemas/ownerSchema');
// const occupancySchema = require('./schemas/occupancySchema');

// const app = express();
// const prisma = new PrismaClient();

// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], 
//   credentials: true, 
// }));

// app.use(express.json());

// // Endpoint para login
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//       return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
//   }

//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user || user.password !== password) {
//       return res.status(401).json({ message: 'Email ou senha incorrectos' });
//   }

//   res.json({ user });
// });

// // Endpoint para criar um usuário
// app.post('/users', async (req, res) => {
//   try {
//     const parsedData = userSchema.parse(req.body);
//     const user = await prisma.user.create({
//       data: parsedData,
//     });
//     res.json(user);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json({ message: "Erro ao validar dados, verifique seus dados!", errors: error.errors });
//     }
//     res.status(500).json({ message: "Impossível cadastrar usuário, ou o email inserido já está cadastrado no sistema" });
//   }
// });

// // Endpoint para listar todos os usuários
// app.get('/users', async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

// // Endpoint para criar um condomínio
// app.post('/condominiums', async (req, res) => {
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

// // Endpoint para listar todos os condomínios
// app.get('/condominiums', async (req, res) => {
//   const condominiums = await prisma.condominium.findMany({
//     include: { streets: true } // Incluir ruas associadas ao condomínio
//   });
//   res.json(condominiums);
// });

// // Endpoint para criar uma rua (street)
// app.post('/streets', async (req, res) => {
//   try {
//     const parsedData = streetSchema.parse(req.body);

//     const street = await prisma.street.create({
//       data: parsedData,
//     });

//     res.json(street);
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return res.status(400).json({ message: "Erro ao validar os dados", errors: error.errors });
//     }
//     res.status(500).json({ message: "Impossível adicionar rua ao condomínio" });
//   }
// });

// // Endpoint para listar todas as ruas
// app.get('/streets', async (req, res) => {
//   const streets = await prisma.street.findMany({
//     include: { lots: true } // Incluir lotes associados à rua
//   });
//   res.json(streets);
// });

// // Endpoint para criar um lote
// app.post('/lots', async (req, res) => {
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

// // Endpoint para listar todos os lotes
// app.get('/lots', async (req, res) => {
//   const lots = await prisma.lot.findMany({
//     include: { street: true } // Incluir a rua associada ao lote
//   });
//   res.json(lots);
// });

// // Endpoint para criar um proprietário
// app.post('/owners', async (req, res) => {
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

// // Endpoint para listar todos os proprietários
// app.get('/owners', async (req, res) => {
//   const owners = await prisma.owner.findMany();
//   res.json(owners);
// });

// // Endpoint para criar uma ocupação
// app.post('/occupancies', async (req, res) => {
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

// // Endpoint para listar todas as ocupações
// app.get('/occupancies', async (req, res) => {
//   const occupancies = await prisma.occupancy.findMany({
//     include: {
//       lot: { include: { street: true } }, // Incluir lotes e ruas
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