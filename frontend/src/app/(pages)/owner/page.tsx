'use client'

import React, { useState } from 'react';
import createAxiosInstance from '@/helpers/global/services/axios/axios.instance';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription, 
    DialogFooter, 
    DialogTrigger, 
    DialogClose 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';

const AddOwner = () => {
    const [fullName, setFullName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [isError, setIsError] = useState(false);
    const axios = createAxiosInstance();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/owners', { full_name: fullName, contact, email });
            setDialogMessage('Proprietário adicionado com sucesso!');
            setIsError(false);
        } catch (error) {
            setDialogMessage('Erro ao adicionar proprietário. Tente novamente.');
            setIsError(true);
        } finally {
            setLoading(false);
            setModalAberto(true);
            resetForm();
        }
    };

    const resetForm = () => {
        setFullName('');
        setContact('');
        setEmail('');
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-center text-black">Adicionar Novo Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-gray-800 font-medium">Nome Completo</label>
                    <Input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="mt-2 block w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-800 font-medium">Contato (Opcional)</label>
                    <Input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="mt-2 block w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-800 font-medium">Email (Opcional)</label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 block w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <Button
                     type="submit"
                     disabled={loading}
                     className={`w-full py-3 rounded-full ${loading ? 'bg-gray-400' : 'bg-black hover:opacity-80'} text-white`}
                 >
                     {loading ? 'Adicionando...' : 'Adicionar Proprietário'}
                 </Button>
            </form>

            <Dialog open={modalAberto} onOpenChange={setModalAberto}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="hidden">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white rounded-lg shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold">{isError ? 'Erro' : 'Sucesso'}</DialogTitle>
                        <DialogDescription className="text-gray-600">
                            {dialogMessage}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" onClick={() => setModalAberto(false)} className="mt-4">
                                Fechar
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddOwner;

// "use client";

// import React, { useState } from 'react';
// import createAxiosInstance from '@/helpers/global/services/axios/axios.instance';
// import { 
//     Dialog, 
//     DialogContent, 
//     DialogHeader, 
//     DialogTitle, 
//     DialogDescription, 
//     DialogFooter, 
//     DialogTrigger, 
//     DialogClose 
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// const AddOwner = () => {
//     const [fullName, setFullName] = useState('');
//     const [contact, setContact] = useState('');
//     const [email, setEmail] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [dialogMessage, setDialogMessage] = useState('');
//     const [modalAberto, setModalAberto] = useState(false);
//     const [isError, setIsError] = useState(false);
//     const axios = createAxiosInstance();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             await axios.post('/owners', { full_name: fullName, contact, email });
//             setDialogMessage('Proprietário adicionado com sucesso!');
//             setIsError(false);
//         } catch (error) {
//             setDialogMessage('Erro ao adicionar proprietário. Tente novamente.');
//             setIsError(true);
//         } finally {
//             setLoading(false);
//             setModalAberto(true);
//             resetForm();
//         }
//     };

//     const resetForm = () => {
//         setFullName('');
//         setContact('');
//         setEmail('');
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Novo cliente</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Nome Completo</label>
//                     <Input
//                         type="text"
//                         value={fullName}
//                         onChange={(e) => setFullName(e.target.value)}
//                         required
//                         className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Contato (Opcional)</label>
//                     <Input
//                         type="text"
//                         value={contact}
//                         onChange={(e) => setContact(e.target.value)}
//                         className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Email (Opcional)</label>
//                     <Input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="mt-1 block w-full border border-gray-300 rounded-md p-2"
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className={`w-full p-2 rounded-md ${loading ? 'bg-gray-400' : 'bg-black hover:opacity-80'} text-white`}
//                 >
//                     {loading ? 'Adicionando...' : 'Adicionar Proprietário'}
//                 </button>
//             </form>

//             <Dialog open={modalAberto} onOpenChange={setModalAberto}>
//                 <DialogTrigger asChild>
//                     <Button variant="outline" className="hidden">Open Dialog</Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-md bg-white">
//                     <DialogHeader>
//                         <DialogTitle>{isError ? 'Erro' : 'Sucesso'}</DialogTitle>
//                         <DialogDescription>
//                             {dialogMessage}
//                         </DialogDescription>
//                     </DialogHeader>
//                     <DialogClose asChild>
//                         <Button type="button" variant="secondary" onClick={() => setModalAberto(false)}>
//                             Fechar
//                         </Button>
//                     </DialogClose>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// };

// export default AddOwner;
