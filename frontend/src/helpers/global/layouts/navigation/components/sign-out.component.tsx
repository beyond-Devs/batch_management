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
            <DialogTitle>Terminar sessão</DialogTitle>
            <DialogDescription>
                Terá que fazer login para voltar a usar os nossos serviços, Deseja continar?
            </DialogDescription>
            <br />
            <DialogFooter className='flex justify-right gap-1'>
                <DialogClose>
                    <Button variant='ghost' className='bg'>Cancelar</Button>
                </DialogClose>

                <Button variant='destructive' onClick={handleSignOut} className='rounded-full'>Terminar sessão</Button>
            </DialogFooter>
        </DialogHeader>
    );
};

export default SignOutDialog;