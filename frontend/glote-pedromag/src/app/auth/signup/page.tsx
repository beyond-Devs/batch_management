"use client";

import { useRef } from 'react';
import api from '@/api/axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SignUp = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignUp = async () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!name || !email || !password) {
      console.error('Todos os campos são obrigatórios');
      return; 
    }

    try {
      const response = await api.post('/users', { full_name: name, email, password });
      console.log('Usuário criado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-lg font-bold">Sign Up</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
        <Input
          id="name"
          ref={nameRef}
          className="mt-1 block w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <Input
          id="email"
          ref={emailRef}
          className="mt-1 block w-full"
          type="email"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <Input
          id="password"
          ref={passwordRef}
          className="mt-1 block w-full"
          type="password"
          required
        />
      </div>
      <Button onClick={handleSignUp} className="w-full">Criar conta</Button>
    </div>
  );
};

export default SignUp;
