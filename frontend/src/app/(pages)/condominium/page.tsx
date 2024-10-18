'use client'

import { useState, useEffect } from "react";
import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";
import { Edit2, Trash2, MoreHorizontal, Plus, FileBarChart2 } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import nofound from '@/assets/midea/app/no-found.png';
import Image from "next/image";

const CondominiumsList = () => {
    const [condominiums, setCondominiums] = useState([]);
    const [filteredCondominiums, setFilteredCondominiums] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentCondo, setCurrentCondo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [isNoFound, setIsNoFound] = useState(false);

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
        const filtered = condominiums.filter(condo =>
            condo.name.toLowerCase().includes(searchName.toLowerCase()) &&
            condo.location.toLowerCase().includes(searchLocation.toLowerCase())
        );
        setFilteredCondominiums(filtered);
    }, [searchName, searchLocation, condominiums]);

    useEffect(() => {
        // Atualiza isNoFound baseado na quantidade de condomínios filtrados
        setIsNoFound(filteredCondominiums.length === 0 && !loading);
    }, [filteredCondominiums, loading]);

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
            {!isNoFound && (<h1 className="text-xl font-semibold text-justify dark:text-white mb-2">Lista de condomínios</h1>)}
            {!isNoFound && (
            <div className="mb-4 flex gap-4">
                <Input
                    type="text"
                    placeholder="Filtrar por Nome"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="w-full dark:border-neutral-600 dark:text-white"
                />
                <Input
                    type="text"
                    placeholder="Filtrar por Localização"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full dark:border-neutral-600 dark:text-white"
                />
            </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    [...Array(6)].map((_, index) => (
                        <Card key={index} className="p-4 shadow-lg rounded-lg dark:bg-gray-800 dark:border-gray-700">
                            <Skeleton className="h-6 w-full mb-4 text-gray-400 dark:text-dark-secondary" />
                            <Skeleton className="h-6 w-full mb-2 text-gray-400 dark:text-dark-secondary" />
                            <Skeleton className="h-6 w-full text-gray-400 dark:text-dark-secondary" />
                        </Card>
                    ))
                ) : (
                    <>
                        {filteredCondominiums.map((condominium) => (
                            <Card key={condominium.id} className="relative shadow-lg p-0 border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl transition-all">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold dark:text-white">{condominium.name}</CardTitle>
                                    <CardDescription className="text-sm dark:text-gray-400">{condominium.location}</CardDescription>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <MoreHorizontal className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-400" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <Link href={`/condominium/manage?id=${condominium.id}`}>
                                                <DropdownMenuItem>
                                                    <FileBarChart2 className="mr-2 w-4 h-4" />
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuItem onClick={() => handleEdit(condominium)}>
                                                <Edit2 className="mr-2 w-4 h-4" /> Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDelete(condominium.id)}>
                                                <Trash2 className="mr-2 w-4 h-4 text-red-600" /> Eliminar
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardHeader>
                                <CardContent>
                                    <p className="dark:text-gray-200">
                                        {condominium.streets && Array.isArray(condominium.streets)
                                            ? `${condominium.streets.reduce((totalLotes, street) => totalLotes + (street.lots?.length || 0), 0)} lote(s) / Terreno (s)`
                                            : 'Sem lotes cadastrados'}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </>
                )}
            </div>

            {isNoFound && (
                <div className="flex flex-col items-center justify-center text-center dark:text-gray-400 w-full">
                    <Image src={nofound} alt="Imagem não encontrada" width={300} className="h-auto" />
                    <h3 className="font-semibold text-xl">Nenhum condomínio encontrado!</h3>
                </div>
            )}

            <Link href="/condominium/create" passHref>
                <Button className="fixed h-12 w-12 bottom-4 right-8 rounded-full p-3 text-white shadow-lg">
                    <Plus className="w-5 h-5 dark:text-black" />
                </Button>
            </Link>

            {/* Dialog for Editing */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md bg-white">
                    <DialogHeader>
                        <DialogTitle>Editar Condomínio</DialogTitle>
                        <DialogDescription>Preencha os dados abaixo para editar o condomínio.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);
                        const updatedData = Object.fromEntries(formData.entries());
                        handleUpdate(updatedData);
                    }}>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-700">Nome do condomínio</label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={currentCondo?.name}
                                className="w-full p-2 border border-gray-300 rounded mt-2 dark:bg-white"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-700">Localização</label>
                            <input
                                type="text"
                                name="location"
                                defaultValue={currentCondo?.location}
                                className="w-full p-2 border border-gray-300 rounded mt-2 dark:bg-white"
                                required
                            />
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
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
