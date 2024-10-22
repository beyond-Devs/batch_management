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
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const app = express();
// const prisma = new PrismaClient();

// const SECRET_KEY = 'aSW8zWJTlrvsN6jbDo23rSU34eDxvcdHni7S2k6M2+Y='; 

// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
//   credentials: true, 
// }));

// app.use(express.json());

// // Endpoint para login
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
//   }

//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: 'Email ou senha incorrectos' });
//   }

//   res.json({ user });
// });

// // Endpoint para criar um usuário
// app.post('/users', async (req, res) => {
//   try {
//     const parsedData = userSchema.parse(req.body);

//     const hashedPassword = await bcrypt.hash(parsedData.password, 10);
//     parsedData.password = hashedPassword;

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

// // Endpoint para listar um usuário por ID
// app.get('/users/:id', async (req, res) => {
//   const { id } = req.params;
//   const user = await prisma.user.findUnique({
//     where: { id: parseInt(id) }
//   });

//   if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
//   res.json(user);
// });

// // Endpoint para exibir os dados do dashboard
// app.get('/dashboard', async (req, res) => {
//   try {
//     // Obtém os totais de condomínios, lotes e proprietários
//     const totalCondominiums = await prisma.condominium.count();
//     const totalLots = await prisma.lot.count();
//     const totalOwners = await prisma.owner.count();

//     // Busca o status dos lotes
//     const lotStatus = await prisma.lot.groupBy({
//       by: ['status'],
//       _count: {
//         status: true,
//       },
//     });

//     // Busca ocupações recentes (limite de 5 ocupações mais recentes)
//     const recentOccupations = await prisma.occupancy.findMany({
//       include: {
//         owner: true,
//         lot: true,
//       },
//       orderBy: {
//         occupancy_date: 'desc',
//       },
//       take: 5, // Limita a 5 resultados
//     });

//     // Envia a resposta com os dados agregados
//     res.status(200).json({
//       totalCondominiums,
//       totalLots,
//       totalOwners,
//       lotStatus,
//       recentOccupations,
//     });
//   } catch (error) {
//     console.error('Erro ao buscar dados do dashboard:', error);
//     res.status(500).json({ error: "Erro ao buscar dados do dashboard" });
//   }
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
//   try {
//       const condominiums = await prisma.condominium.findMany({
//           include: {
//               streets: {
//                   include: {
//                       lots: true
//                   }
//               }
//           }
//       });

//       const condominiumsWithLotCount = condominiums.map(condo => ({
//           ...condo,
//           totalLots: condo.streets.reduce((acc, street) => acc + (street.lots?.length || 0), 0)
//       }));

//       res.json(condominiumsWithLotCount);
//   } catch (error) {
//       res.status(500).json({ error: "Error fetching condominiums" });
//   }
// });

// // Endpoint para listar um condomínio por ID
// app.get('/condominiums/:id', async (req, res) => {
//   const { id } = req.params;
//   const condominium = await prisma.condominium.findUnique({
//     where: { id: parseInt(id) },
//     include: { streets: true } // Incluir ruas associadas ao condomínio
//   });

//   if (!condominium) return res.status(404).json({ message: "Condomínio não encontrado" });
//   res.json(condominium);
// });

// // Endpoint para criar uma rua (street)
// app.post('/streets', async (req, res) => {
//   try {
//     // Validar os dados da requisição usando Zod
//     const parsedData = streetSchema.parse(req.body);

//     // Criar a nova rua no banco de dados usando Prisma
//     const street = await prisma.street.create({
//       data: {
//         name: parsedData.name,
//         condominiumId: parsedData.condominiumId, // Se não houver ID do condomínio, será nulo
//       },
//     });

//     // Retornar a rua criada como resposta
//     res.json(street);
//   } catch (error) {
//     // Se houver erro de validação, retorna um status 400 e os erros
//     if (error instanceof z.ZodError) {
//       return res.status(400).json({ message: "Erro ao validar os dados", errors: error.errors });
//     }
//     // Caso contrário, retorna um status 500 para erros internos do servidor
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

// // Endpoint para listar uma rua por ID
// app.get('/streets/:id', async (req, res) => {
//   const { id } = req.params;
//   const street = await prisma.street.findUnique({
//     where: { id: parseInt(id) },
//     include: { lots: true } // Incluir lotes associados à rua
//   });

//   if (!street) return res.status(404).json({ message: "Rua não encontrada" });
//   res.json(street);
// });

// // Endpoint para listar ruas por condomínio (com base no ID do condomínio)
// app.get('/streets/condominium/:condominiumId', async (req, res) => {
//   const { condominiumId } = req.params;
//   const streets = await prisma.street.findMany({
//     where: { condominium_id: parseInt(condominiumId) },
//     include: { lots: true } // Incluir lotes associados à rua
//   });

//   if (streets.length === 0) return res.status(404).json({ message: "Nenhuma rua encontrada para o condomínio" });
//   res.json(streets);
// });

// // Endpoint para criar um lote
// app.post('/lots', async (req, res) => {
//   try {
//     // Validação dos dados de entrada usando Zod
//     const parsedData = lotSchema.parse(req.body);

//     // Criação do lote no banco de dados
//     const lot = await prisma.lot.create({
//       data: {
//         lot_number: parsedData.lot_number,  
//         street_id: parsedData.street_id,    // Associando o lote à rua pelo ID, se fornecido
//         status: parsedData.status,          // Status do lote, se fornecido
//         description: parsedData.description, // Descrição do lote, se fornecida
//       },
//     });

//     // Retorna o lote criado como resposta
//     res.json(lot);
//   } catch (error) {
//     // Tratamento de erros de validação do Zod
//     if (error instanceof z.ZodError) {
//       return res.status(400).json(error.errors);
//     }

//     // Tratamento de outros erros
//     res.status(500).json({ message: "Erro interno do servidor" });
//   }
// });

// // Rota para atualizar apenas o status de um lote
// app.patch('/lots/:id', async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body; // O status recebido deve ser um valor do enum LotStatus

//   try {
//     const updatedLot = await prisma.lot.update({
//       where: { id: Number(id) },
//       data: { 
//         status: status,  // Aqui você passa o valor do enum, por exemplo 'Occupied'
//       },
//     });

//     res.json(updatedLot);
//   } catch (error) {
//     res.status(500).json({ error: 'Erro ao atualizar o status do lote' });
//   }
// });

// // Endpoint para listar todos os lotes
// app.get('/lots', async (req, res) => {
//   const lots = await prisma.lot.findMany({
//     include: { street: true } // Incluir a rua associada ao lote
//   });
//   res.json(lots);
// });

// // Endpoint para listar um lote por ID
// app.get('/lots/:id', async (req, res) => {
//   const { id } = req.params;
//   const lot = await prisma.lot.findUnique({
//     where: { id: parseInt(id) },
//     include: { street: true } // Incluir a rua associada ao lote
//   });

//   if (!lot) return res.status(404).json({ message: "Lote não encontrado" });
//   res.json(lot);
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

// // Endpoint para listar um proprietário por ID
// app.get('/owners/:id', async (req, res) => {
//   const { id } = req.params;
//   const owner = await prisma.owner.findUnique({
//     where: { id: parseInt(id) }
//   });

//   if (!owner) return res.status(404).json({ message: "Proprietário não encontrado" });
//   res.json(owner);
// });

// // Rota para registrar uma nova ocupação
// app.post('/occupancies', async (req, res) => {
//   const { lot_id, owner_id } = req.body; 

//   try {
//     const newOccupancy = await prisma.occupancy.create({
//       data: {
//         lot_id: Number(lot_id),     
//         owner_id: Number(owner_id),  
//         occupancy_date: new Date(),  
//       },
//     });

//     res.status(201).json(newOccupancy);
//   } catch (error) {
//     res.status(500).json({ error: 'Erro ao registrar a ocupação' });
//   }
// });


// // Endpoint para listar todas as ocupações
// app.get('/occupancies', async (req, res) => {
//   try {
//     const occupancies = await prisma.occupancy.findMany({
//       include: {
//         lot: {
//           include: {
//             street: {
//               include: {
//                 condominium: true, 
//               },
//             },
//           },
//         },
//         owner: true, 
//       },
//     });

//     // Ordenando ocupações por data
//     const sortedOccupancies = occupancies.sort((a, b) => {
//       const dateA = new Date(a.occupancy_date).getTime();
//       const dateB = new Date(b.occupancy_date).getTime();
//       return dateB - dateA; 
//     });

//     res.status(200).json(sortedOccupancies);
//   } catch (error) {
//     console.error("Erro ao buscar ocupações:", error);
//     res.status(500).json({ error: 'Erro ao buscar ocupações' });
//   }
// });

// // Endpoint para listar uma ocupação por ID
// app.get('/occupancies/:id', async (req, res) => {
//   const { id } = req.params;
//   const occupancy = await prisma.occupancy.findUnique({
//     where: { id: parseInt(id) },
//     include: {
//       lot: true,
//       owner: true,
//       user: true,
//     }
//   });

//   if (!occupancy) return res.status(404).json({ message: "Ocupação não encontrada" });
//   res.json(occupancy);
// });

// app.listen(8000, () => {
//   console.log('Servidor rodando na porta 8000');
// });

const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const dashboardRoutes = require('./routes/dashboard')
const condominiumRoutes = require('./routes/condominiums');
const streetRoutes = require('./routes/streets');
const lotRoutes = require('./routes/lots');
const ownerRoutes = require('./routes/owners');
const occupancyRoutes = require('./routes/occupancies');

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/condominiums', condominiumRoutes);
app.use('/streets', streetRoutes);
app.use('/lots', lotRoutes);
app.use('/owners', ownerRoutes);
app.use('/occupancies', occupancyRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
