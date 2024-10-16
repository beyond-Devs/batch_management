"use client";

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";
import { 
    Dialog, 
    DialogTrigger, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription, 
    DialogClose 
} from '@/components/ui/dialog';

const AddCondominium = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const axios = createAxiosInstance();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/condominiums', { name, location });
            setDialogMessage('Condomínio adicionado com sucesso!');
            setIsError(false);

            // Reset input fields
            setName('');
            setLocation('');
        } catch (error) {
            setDialogMessage(error.response?.data?.message || 'Ocorreu um erro. Tente novamente.');
            setIsError(true);
        } finally {
            setOpenDialog(true);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto my-5 p-8 bg-white dark:bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold text-center mb-4 dark:text-white">Novo Condomínio</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name" className="dark:text-white">Nome do Condomínio</Label>
                    <Input 
                        id="name" 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <Label htmlFor="location" className="dark:text-white">Localização (Opcional)</Label>
                    <Input 
                        id="location" 
                        type="text" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Aguarde...' : 'Adicionar Condomínio'}
                </Button>
            </form>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="hidden">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white">
                    <DialogHeader>
                        <DialogTitle>{isError ? 'Erro' : 'Sucesso'}</DialogTitle>
                        <DialogDescription>
                            {dialogMessage}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={() => setOpenDialog(false)}>
                            Fechar
                        </Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddCondominium;