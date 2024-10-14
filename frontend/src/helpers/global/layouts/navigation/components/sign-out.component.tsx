import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { signOut } from 'next-auth/react';
import React from 'react';

const SignOutDialog = () => {
    const handleSignOut = () => {
        signOut({
            callbackUrl: "/",
            redirect: true
        });
    }

    return (
        <DialogHeader>
            <DialogTitle>Tem certeza que deseja sair?</DialogTitle>
            <DialogDescription>
                Esta ação não pode ser desfeita. Isto removerá permanentemente sua conta
                e excluirá seus dados de nossos servidores.
            </DialogDescription>
            <br />
            <DialogFooter className='flex justify-right gap-1'>
                <DialogClose>
                    <Button variant='ghost' className='bg'>Cancelar</Button>
                </DialogClose>

                <Button variant='destructive' onClick={handleSignOut} className='rounded-full'>Sair</Button>
            </DialogFooter>
        </DialogHeader>
    );
};

export default SignOutDialog;