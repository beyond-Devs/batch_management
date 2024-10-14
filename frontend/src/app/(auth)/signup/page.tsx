"use client";

import Link from 'next/link';
import useSignup from '@/helpers/single/sign-up/hooks/sign'; 
import { Input } from '@/components/ui/input';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SCH_signup, SCH_signup_Props } from '@/helpers/single/sign-up/schemas/sign.zod.schema'; 
import { toast } from '@/helpers/single/sign-in/hooks/use-toast';

const Page = () => {
    const { signup, loading, error } = useSignup();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SCH_signup_Props>({
        resolver: zodResolver(SCH_signup),
    });

    const onSubmit = async (data: SCH_signup_Props) => {
        const result = await signup(data);
        if (result) {
            toast({ title: "Cadastro realizado com sucesso!", variant: "success", description: "Você pode fazer login agora." });
        } else {
            // toast({ title: "Erro", variant: "destructive", description: error || "Não foi possível cadastrar." });
            toast({ title: "Erro", variant: "destructive", description: error || "Não foi possível cadastrar." });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <main className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                    <div className="flex items-center space-x-2 mb-7">
                        <div className="w-6 h-6 bg-blue-500 rounded-full" />
                        <span className="text-xl font-semibold">Pedromag</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">
                        Cadastro.
                        <br />
                        Bem-vindo a Pedromag.
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.{" "}
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Já tem uma conta? Faça login.
                        </Link>
                    </p>
                </div>
                <div className="w-full md:w-1/2 md:ml-8">
                    <Card>
                        <CardContent className="p-6">
                            {/* {error && (
                                <div className={`rounded-md p-2 pl-4 pr-4 text-sm mb-3 bg-red-300 text-black`}>
                                    {error}
                                </div>
                            )} */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nome Completo
                                    </label>
                                    <Input
                                        id="full_name"
                                        type="text"
                                        placeholder="Digite seu nome completo"
                                        disabled={loading}
                                        {...register("full_name")}
                                        className={`font-medium text-sm w-full h-11 px-4 border-slate-300 focus:!ring-2 ${errors.full_name ? '!ring-2 !ring-red-500' : '!ring-blue-800'}`}
                                    />
                                    {errors.full_name && (
                                        <div className='flex text-red-500 items-center mt-1'>
                                            <AlertCircle className='w-4 h-4 mr-1' />
                                            <span>{errors.full_name.message}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        type="text"
                                        placeholder="Digite seu email"
                                        disabled={loading}
                                        {...register("email")}
                                        className={`font-medium text-sm w-full h-11 px-4 border-slate-300 focus:!ring-2 ${errors.email ? '!ring-2 !ring-red-500' : '!ring-blue-800'}`}
                                    />
                                    {errors.email && (
                                        <div className='flex text-red-500 items-center mt-1'>
                                            <AlertCircle className='w-4 h-4 mr-1' />
                                            <span>{errors.email.message}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Senha
                                    </label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Digite sua senha"
                                        disabled={loading}
                                        {...register("password")}
                                        className={`font-medium text-sm w-full h-11 px-4 border-slate-300 focus:!ring-2 ${errors.password ? '!ring-2 !ring-red-500' : '!ring-blue-800'}`}
                                    />
                                    {errors.password && (
                                        <div className='flex text-red-600 items-center mt-1'>
                                            <AlertCircle className='w-4 h-4 mr-1' />
                                            <span>{errors.password.message}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirme a Senha
                                    </label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirme sua senha"
                                        disabled={loading}
                                        {...register("confirmPassword")}
                                        className={`font-medium text-sm w-full h-11 px-4 border-slate-300 focus:!ring-2 ${errors.confirmPassword ? '!ring-2 !ring-red-500' : '!ring-blue-800'}`}
                                    />
                                    {errors.confirmPassword && (
                                        <div className='flex text-red-600 items-center mt-1'>
                                            <AlertCircle className='w-4 h-4 mr-1' />
                                            <span>{errors.confirmPassword.message}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                        Papel
                                    </label>
                                    <select
                                        id="role"
                                        disabled={loading}
                                        {...register("role")}
                                        className={`font-medium text-sm w-full h-11 px-4 border-slate-300 focus:!ring-2 ${errors.role ? '!ring-2 !ring-red-500' : '!ring-blue-800'}`}
                                    >
                                        <option value="user">Usuário</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                    {errors.role && (
                                        <div className='flex text-red-600 items-center mt-1'>
                                            <AlertCircle className='w-4 h-4 mr-1' />
                                            <span>{errors.role.message}</span>
                                        </div>
                                    )}
                                </div>

                                <Button className="w-full" disabled={loading}>{loading ? "Carregando..." : "Criar conta"}</Button>
                            </form>
                        </CardContent>
                    </Card>
                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-600">Já tem uma conta?</span>{" "}
                        <Link href="/" className="text-sm text-blue-500 hover:underline">Faça login</Link>
                    </div>
                </div>
            </main>
            <Toaster />
        </div>
    );
}

export default Page;
