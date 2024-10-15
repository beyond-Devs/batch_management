"use client";

import { useState, useEffect } from "react";
import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2, Trash2, MoreHorizontal, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

const CondominiumsList = () => {
    const [condominiums, setCondominiums] = useState([]);
    const [filteredCondominiums, setFilteredCondominiums] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentCondo, setCurrentCondo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const axios = createAxiosInstance();

    useEffect(() => {
        const fetchCondominiums = async () => {
            try {
                const response = await axios.get('/condominiums');
                setCondominiums(response.data);
                setFilteredCondominiums(response.data);
            } catch (error) {
                console.error("Error fetching condominiums:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCondominiums();
    }, [axios]);

    useEffect(() => {
        // Atualiza os condomínios filtrados sempre que searchName ou searchLocation mudarem
        const filtered = condominiums.filter(condo =>
            condo.name.toLowerCase().includes(searchName.toLowerCase()) &&
            condo.location.toLowerCase().includes(searchLocation.toLowerCase())
        );
        setFilteredCondominiums(filtered);
    }, [searchName, searchLocation, condominiums]);

    const handleEdit = (condominium) => {
        setCurrentCondo(condominium);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm("Você tem certeza que deseja excluir este condomínio?")) {
            try {
                await axios.delete(`/condominiums/${id}`);
                setCondominiums(condominiums.filter(condo => condo.id !== id));
                alert("Condomínio excluído com sucesso!");
            } catch (error) {
                console.error("Error deleting condominium:", error);
                alert(error.response.data.message);
            }
        }
    };

    const handleUpdate = async (updatedData) => {
        try {
            await axios.put(`/condominiums/${currentCondo.id}`, updatedData);
            setCondominiums(condominiums.map(condo => condo.id === currentCondo.id ? { ...condo, ...updatedData } : condo));
            setIsDialogOpen(false);
            alert("Condomínio atualizado com sucesso!");
        } catch (error) {
            console.error("Error updating condominium:", error);
            alert("Erro ao atualizar o condomínio." + error.response.data.message);
        }
    };

    return (
        <div className="w-11/12 mx-auto my-5 relative h-auto">
            <div className="grid grid-cols-2 mb-4">
                <h1 className="text-xl font-semibold text-justify dark:text-white">Lista de condomínios</h1>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Filtrar por Nome"
                    className="p-2 border border-gray-300 rounded mr-2"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filtrar por Localização"
                    className="p-2 border border-gray-300 rounded"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                />
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg mb-2 mt-3">
                {loading ? (
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="dark:text-white">Nome</TableHead>
                                    <TableHead className="dark:text-white">Localização</TableHead>
                                    <TableHead className="dark:text-white">Ruas</TableHead>
                                    <TableHead className="dark:text-white">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[...Array(5)].map((_, index) => (
                                    <TableRow key={index} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <TableCell><Skeleton className="h-6 w-full text-gray-400" /></TableCell>
                                        <TableCell><Skeleton className="h-6 w-full text-gray-400" /></TableCell>
                                        <TableCell><Skeleton className="h-6 w-full text-gray-400" /></TableCell>
                                        <TableCell><Skeleton className="h-6 w-full text-gray-400" /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    filteredCondominiums.length > 0 ? (
                        <div className="overflow-y-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="dark:text-white">Nome</TableHead>
                                        <TableHead className="dark:text-white">Localização</TableHead>
                                        <TableHead className="dark:text-white">Ruas</TableHead>
                                        <TableHead className="dark:text-white">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCondominiums.map((condominium) => (
                                        <TableRow key={condominium.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <TableCell className="dark:text-gray-200">{condominium.name}</TableCell>
                                            <TableCell className="dark:text-gray-200">{condominium.location}</TableCell>
                                            <TableCell>
                                                {condominium.streets && Array.isArray(condominium.streets) && condominium.streets.length > 0 ? (
                                                    <p className="dark:text-gray-200">
                                                        {condominium.streets.length} {condominium.streets.length === 1 ? 'rua' : 'ruas'}
                                                    </p>
                                                ) : (
                                                    <p className="dark:text-gray-400">Sem ruas cadastradas</p>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <button className="flex items-center text-gray-500 hover:text-gray-700">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem onClick={() => handleEdit(condominium)}>
                                                            <Edit2 className="mr-2 w-4 h-4" /> Editar
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDelete(condominium.id)}>
                                                            <Trash2 className="mr-2 w-4 h-4 text-red-600" /> Eliminar
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="text-center dark:text-gray-400">
                            <p>Não foi encontrado nenhum condomínio.</p>
                        </div>
                    )
                )}
            </div>

            <Link href="/condominium/create" passHref>
                <Button className="fixed h-12 w-12 bottom-4 right-8 rounded-full p-3 text-white shadow-lg">
                    <Plus className="w-5 h-5" />
                </Button>
            </Link>

            {/* Dialog for Editing */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md bg-white">
                    <DialogHeader>
                        <DialogTitle>Editar Condomínio</DialogTitle>
                        <DialogDescription>
                            Preencha os dados abaixo para editar o condomínio.
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const formData = new FormData(form);
                            const updatedData = {
                                name: formData.get("name") as string,
                                location: formData.get("location") as string,
                            };
                            handleUpdate(updatedData);
                        }}
                    >
                        <div className="mb-4">
                            <label className="block mb-1">Nome</label>
                            <input
                                name="name"
                                defaultValue={currentCondo?.name}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Localização</label>
                            <input
                                name="location"
                                defaultValue={currentCondo?.location}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <DialogClose asChild>
                                <Button variant="secondary" className="ml-2">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Salvar</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CondominiumsList;
