"use client";

import { useState, useEffect } from "react";
import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const OccupanciesList = () => {
    const [occupancies, setOccupancies] = useState([]);
    const [filteredOccupancies, setFilteredOccupancies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const axios = createAxiosInstance();

    useEffect(() => {
        const fetchOccupancies = async () => {
            try {
                const response = await axios.get('/occupancies');
                const sortedOccupancies = response.data.sort((a, b) => {
                    const dateA = new Date(a.occupancy_date).getTime();
                    const dateB = new Date(b.occupancy_date).getTime();
                    return dateB - dateA;
                });
                setOccupancies(sortedOccupancies);
                setFilteredOccupancies(sortedOccupancies);
            } catch (error) {
                console.error("Erro ao buscar ocupações:", error);
            }
        };

        fetchOccupancies();
    }, []);

    useEffect(() => {
        const results = occupancies.filter(occupancy => {
            const lotNumber = occupancy.lot?.lot_number?.toString() || '';
            const ownerName = occupancy.owner?.full_name?.toLowerCase() || '';
            return lotNumber.includes(searchTerm) || ownerName.includes(searchTerm.toLowerCase());
        });
        setFilteredOccupancies(results);
    }, [searchTerm, occupancies]);

    return (
        <>
            <div className="relative">
                <Card className="bg-white dark:bg-gray-800 border-none">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">Lista de Ocupações</CardTitle>
                        <Input
                            type="text"
                            placeholder="Buscar por Lote ou Proprietário"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mt-2 p-2 w-auto border border-gray-300 rounded"
                        />
                    </CardHeader>
                    <CardContent>
                        {filteredOccupancies.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400">Nenhuma ocupação encontrada</p>
                        ) : (
                            <ScrollArea className="h-[400px]">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Lote</TableHead>
                                            <TableHead>Condomínio</TableHead>
                                            <TableHead>Proprietário</TableHead>
                                            <TableHead>Data de Ocupação</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredOccupancies.map((occupancy) => (
                                            <TableRow key={occupancy.id}>
                                                <TableCell>{occupancy.lot?.lot_number || 'N/A'}</TableCell>
                                                <TableCell>{occupancy.lot?.street?.condominium?.name || 'N/A'}</TableCell>
                                                <TableCell>{occupancy.owner?.full_name || 'N/A'}</TableCell>
                                                <TableCell>{new Date(occupancy.occupancy_date).toLocaleDateString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        )}
                    </CardContent>
                </Card>
                <Link href="/occupancy/create" passHref>
                    <Button className="fixed h-12 w-12 bottom-4 right-8 rounded-full p-3 text-white shadow-lg">
                        <Plus className="w-5 h-5 dark:text-black" />
                    </Button>
                </Link>
            </div>
        </>
    );
};

export default OccupanciesList;