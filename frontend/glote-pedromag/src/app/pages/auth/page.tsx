"use client";

import { useRef } from 'react';
import api from '@/api/axios';
import axios from "axios";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Login = () => {
  // Criar referências para os inputs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email: emailRef,
        password: passwordRef,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Erro ao fazer login:', error.response.data); 
      } else {
        console.error('Erro ao fazer login:', error);
      }
    }
  };
  

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-lg font-bold">Login</h2>
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
      <Button onClick={handleLogin} className="w-full">Login</Button>
    </div>
  );
};

export default Login;
