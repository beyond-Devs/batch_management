'use client'

import { useState, useEffect } from "react";
import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const OccupanciesList = () => {
    const [occupancies, setOccupancies] = useState([]);
    const [filteredOccupancies, setFilteredOccupancies] = useState([]);
    const [lotSearchTerm, setLotSearchTerm] = useState("");
    const [ownerSearchTerm, setOwnerSearchTerm] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const axios = createAxiosInstance();

    useEffect(() => {
        const fetchOccupancies = async () => {
            setLoading(true);
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
                setError("Erro ao buscar ocupações");
                console.error("Erro ao buscar ocupações:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOccupancies();
    }, []);

    useEffect(() => {
        const results = occupancies.filter(occupancy => {
            const lotNumber = occupancy.lot?.lot_number?.toString() || '';
            const ownerName = occupancy.owner?.full_name?.toLowerCase() || '';
            const occupancyDate = new Date(occupancy.occupancy_date).toLocaleDateString();

            const matchesLotSearchTerm = lotNumber.includes(lotSearchTerm);
            const matchesOwnerSearchTerm = ownerName.includes(ownerSearchTerm.toLowerCase());
            const matchesDate = !filterDate || occupancyDate === new Date(filterDate).toLocaleDateString();

            return matchesLotSearchTerm && matchesOwnerSearchTerm && matchesDate;
        });
        setFilteredOccupancies(results);
        setCurrentPage(1);
    }, [lotSearchTerm, ownerSearchTerm, filterDate, occupancies]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredOccupancies.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredOccupancies.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="relative">
                <Card className="bg-white dark:bg-gray-800 border-none shadow-md">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">Lista de Ocupações</CardTitle>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-2">
                            <Input
                                type="text"
                                placeholder="Buscar por Lote"
                                value={lotSearchTerm}
                                onChange={(e) => setLotSearchTerm(e.target.value)}
                                className="flex-1 p-2 border border-gray-300 rounded"
                            />
                            <Input
                                type="text"
                                placeholder="Buscar por Proprietário"
                                value={ownerSearchTerm}
                                onChange={(e) => setOwnerSearchTerm(e.target.value)}
                                className="flex-1 p-2 border border-gray-300 rounded"
                            />
                            <Input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="flex-1 p-2 border border-gray-300 rounded"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
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
                                        {Array.from({ length: itemsPerPage }).map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ScrollArea>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : filteredOccupancies.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400">Nenhuma ocupação encontrada</p>
                        ) : (
                            <>
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
                                            {currentItems.map((occupancy) => (
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
                                <div className="flex justify-center mt-4">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <Button
                                            key={index}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`mx-1 ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-200'}`}
                                        >
                                            {index + 1}
                                        </Button>
                                    ))}
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
                <Link href="/occupancy/create" passHref>
                    <Button className="fixed h-12 w-12 bottom-4 right-8 rounded-full p-3 text-white bg-black shadow-lg">
                        <Plus className="w-5 h-5" />
                    </Button>
                </Link>
            </div>
        </>
    );
};

export default OccupanciesList;


// "use client";

// import { useState, useEffect } from "react";
// import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";

// const OccupanciesList = () => {
//     const [occupancies, setOccupancies] = useState([]);
//     const [filteredOccupancies, setFilteredOccupancies] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");

//     const axios = createAxiosInstance();

//     useEffect(() => {
//         const fetchOccupancies = async () => {
//             try {
//                 const response = await axios.get('/occupancies');
//                 const sortedOccupancies = response.data.sort((a, b) => {
//                     const dateA = new Date(a.occupancy_date).getTime();
//                     const dateB = new Date(b.occupancy_date).getTime();
//                     return dateB - dateA;
//                 });
//                 setOccupancies(sortedOccupancies);
//                 setFilteredOccupancies(sortedOccupancies);
//             } catch (error) {
//                 console.error("Erro ao buscar ocupações:", error);
//             }
//         };

//         fetchOccupancies();
//     }, []);

//     useEffect(() => {
//         const results = occupancies.filter(occupancy => {
//             const lotNumber = occupancy.lot?.lot_number?.toString() || '';
//             const ownerName = occupancy.owner?.full_name?.toLowerCase() || '';
//             return lotNumber.includes(searchTerm) || ownerName.includes(searchTerm.toLowerCase());
//         });
//         setFilteredOccupancies(results);
//     }, [searchTerm, occupancies]);

//     return (
//         <>
//             <div className="relative">
//                 <Card className="bg-white dark:bg-gray-800 border-none">
//                     <CardHeader>
//                         <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">Lista de Ocupações</CardTitle>
//                         <Input
//                             type="text"
//                             placeholder="Buscar por Lote ou Proprietário"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="mt-2 p-2 w-auto border border-gray-300 rounded"
//                         />
//                     </CardHeader>
//                     <CardContent>
//                         {filteredOccupancies.length === 0 ? (
//                             <p className="text-gray-500 dark:text-gray-400">Nenhuma ocupação encontrada</p>
//                         ) : (
//                             <ScrollArea className="h-[400px]">
//                                 <Table>
//                                     <TableHeader>
//                                         <TableRow>
//                                             <TableHead>Lote</TableHead>
//                                             <TableHead>Condomínio</TableHead>
//                                             <TableHead>Proprietário</TableHead>
//                                             <TableHead>Data de Ocupação</TableHead>
//                                         </TableRow>
//                                     </TableHeader>
//                                     <TableBody>
//                                         {filteredOccupancies.map((occupancy) => (
//                                             <TableRow key={occupancy.id}>
//                                                 <TableCell>{occupancy.lot?.lot_number || 'N/A'}</TableCell>
//                                                 <TableCell>{occupancy.lot?.street?.condominium?.name || 'N/A'}</TableCell>
//                                                 <TableCell>{occupancy.owner?.full_name || 'N/A'}</TableCell>
//                                                 <TableCell>{new Date(occupancy.occupancy_date).toLocaleDateString()}</TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </ScrollArea>
//                         )}
//                     </CardContent>
//                 </Card>
//                 <Link href="/occupancy/create" passHref>
//                     <Button className="fixed h-12 w-12 bottom-4 right-8 rounded-full p-3 text-white shadow-lg">
//                         <Plus className="w-5 h-5 dark:text-black" />
//                     </Button>
//                 </Link>
//             </div>
//         </>
//     );
// };

// export default OccupanciesList;