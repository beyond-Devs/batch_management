// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import SignOutDialog from "@/helpers/global/layouts/navigation/components/sign-out.component";
// import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { LogOutIcon } from "lucide-react";

// const Page = () => {
//   return (
//     <>
//       <div>
//         <Dialog>
//           <DialogTrigger className="flex gap-1 py-1 items-center cursor-pointer px-3 text-sm w-full rounded-sm bg-red-200 dark:bg-red-800">
//             <LogOutIcon className="w-5 h-5" />
//             <div className="w-max flex">Sair</div>
//           </DialogTrigger>
//           <DialogContent className="bg-white">
//             <SignOutDialog />
//           </DialogContent>
//         </Dialog>
//       </div>
//     </>
//   );
// };

// export default Page;

"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Map, Users } from "lucide-react";

const lotStatusData = [
  { name: "Ocupado", value: 300, color: "#4CAF50" },
  { name: "Avalidados", value: 150, color: "#2196F3" },
  { name: "Construção", value: 50, color: "#FFC107" },
]

const recentOccupations = [
  { id: 1, owner: "João Silva", lot: "A-101", date: "2024-10-12", type: "Residente" },
  { id: 2, owner: "Jane Doe", lot: "B-205", date: "2024-10-13", type: "Investidor" },
  { id: 3, owner: "Miguel Santos", lot: "C-303", date: "2024-10-14", type: "Residente" },
  { id: 4, owner: "Emília Oliveira", lot: "D-404", date: "2024-10-15", type: "Investidor" },
  { id: 5, owner: "Alex Lima", lot: "E-505", date: "2024-10-16", type: "Residente" },
]

const Page = () => {
  const [ownerFilter, setOwnerFilter] = useState("Todos")
  const [darkMode, setDarkMode] = useState(false)
  const [chartFilter, setChartFilter] = useState("Todos")

  const filteredOccupations = ownerFilter === "Todos" 
    ? recentOccupations 
    : recentOccupations.filter(occupation => occupation.type === ownerFilter)

  const filteredLotStatusData = chartFilter === "Todos" 
    ? lotStatusData 
    : lotStatusData.filter(item => item.name === chartFilter)

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Painel de Controle</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Total de Condomínios</CardTitle>
            <Building className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Total de Terrenos</CardTitle>
            <Map className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">500</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-400 to-purple-600 text-white border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Total de Proprietários</CardTitle>
            <Users className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">450</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico de Status de Lotes */}
        <Card className="bg-white dark:bg-gray-800 border-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">Distribuição de Status de Lotes</CardTitle>
            <Select value={chartFilter} onValueChange={setChartFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar gráfico" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Ocupado">Ocupado</SelectItem>
                <SelectItem value="Vago">Vago</SelectItem>
                <SelectItem value="Em Manutenção">Em Manutenção</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-[100%] ">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredLotStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8">
                    {filteredLotStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Ocupações Recentes */}
        <Card className="bg-white dark:bg-gray-800 border-none">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">Ocupações Recentes</CardTitle>
            <CardDescription>Proprietários que ocuparam imóveis nos últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input placeholder="Pesquisar ocupações..." className="flex-1 dark:border-gray-600" />
                <Select value={ownerFilter} onValueChange={setOwnerFilter}>
                  <SelectTrigger className="w-[180px] dark:border-gray-600">
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="Residente">Residente</SelectItem>
                    <SelectItem value="Investidor">Investidor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ScrollArea className="h-[240px]">
                <div className="space-y-4">
                  {filteredOccupations.map((occupation, index) => (
                    <motion.div
                      key={occupation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2"
                    >
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{occupation.owner}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Lote: {occupation.lot}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{occupation.date}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{occupation.type}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}


export default Page;