"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Map, Users } from "lucide-react";
import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";

const Page = () => {
  const [data, setData] = useState(null);
  const [ownerFilter, setOwnerFilter] = useState("Todos");
  const [chartFilter, setChartFilter] = useState("Todos");

  const axios = createAxiosInstance();

  useEffect(() => {
    axios.get("/dashboard")
      .then(response => setData(response.data))
      .catch(error => console.error("Erro ao buscar dados do dashboard:", error));
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const statusMap = {
    Available: "Disponível",
    Occupied: "Ocupado",
    Construction: "Em construção",
    Delivered: "Entregue",
  };

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  const { totalCondominiums, totalLots, totalOwners, lotStatus, recentOccupations, oldOccupations } = data;

  const filteredOccupations = ownerFilter === "Todos"
    ? (recentOccupations.length > 0 ? recentOccupations : oldOccupations)
    : (recentOccupations.length > 0 ? recentOccupations : oldOccupations).filter(occupation => occupation.owner.type === ownerFilter);

  const filteredLotStatusData = chartFilter === "Todos"
    ? lotStatus
    : lotStatus.filter(item => item.status === chartFilter);

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {totalCondominiums > 0 ? (
          <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Total de Condomínios</CardTitle>
              <Building className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalCondominiums}</div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-gradient-to-br from-green-400 to-green-600 text-white border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Total de Condomínios</CardTitle>
              <Building className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">----</div>
            </CardContent>
          </Card>
        )}
        {totalLots > 0 ? (
          <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Total de Terrenos</CardTitle>
              <Map className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalLots}</div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Total de Terrenos</CardTitle>
              <Map className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">----</div>
            </CardContent>
          </Card>
        )}
        {totalOwners > 0 ? (
          <Card className="bg-gradient-to-br from-purple-400 to-purple-600 text-white border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Total de clientes</CardTitle>
              <Users className="h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalOwners}</div>
            </CardContent>
          </Card>
        ) : (<Card className="bg-gradient-to-br from-purple-400 to-purple-600 text-white border-none opacity-15">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Total de Proprietários</CardTitle>
            <Users className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">----</div>
          </CardContent>
        </Card>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {lotStatus?.length > 0 && (
          <Card className="bg-white dark:bg-gray-800 border-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">Distribuição de Status de Lotes</CardTitle>
              <Select value={chartFilter} onValueChange={setChartFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar gráfico" />
                </SelectTrigger>
                <SelectContent>
                  {lotStatus?.length > 0 && lotStatus.map((item) => (
                    <SelectItem key={item.status} value={item.status}>
                      {statusMap[item.status]} 
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-[100%]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredLotStatusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" tickFormatter={(status) => statusMap[status]} /> 
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="_count.status" fill="#8884d8">
                      {filteredLotStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} /> 
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredOccupations?.length > 0 && (
          <Card className="bg-white dark:bg-gray-800 border-none">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">Ocupações Recentes</CardTitle>
              <CardDescription>Proprietários que ocuparam imóveis nos últimos 7 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input placeholder="Pesquisar ocupações..." className="flex-1 dark:border-gray-600" />
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
                          <p className="font-medium text-gray-800 dark:text-gray-200">{occupation.owner.full_name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Lote: {occupation.lot.lot_number}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(occupation.occupancy_date).toLocaleDateString()}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">{occupation.owner.type}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
};

export default Page;