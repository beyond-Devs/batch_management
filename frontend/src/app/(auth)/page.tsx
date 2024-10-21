"use client";

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLogin } from "@/helpers/single/sign-in/hooks/login";
import { Rocket, Clock, Star, FileText } from "lucide-react"
import condomain from "@/assets/midea/app/condomain.webp"
import logo from "@/assets/midea/app/avatar-login.png"
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";


const Page = () => {
  const { form, isPadding, onsubmit } = useLogin();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 flex-wrap-reverse">
      <div className="flex-1 flex items-center justify-center px-0 righ-waves md:hidden" 
      style={{
        backgroundImage: `linear-gradient(121deg, rgb(0 0 0), #0000009c), url(${condomain.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',}}>
        <div className="relative w-full max-w-full">
          <div className="m-8 relative space-y-4">
            <div className="py-0 mt-4 px-6 bg-transparent rounded-lg items-center justify-center">
              <div className="w-full h-full flex-shrink-0 block text-center items-center justify-center">
                <h2 className="text-2xl font-bold text-white">
                  Gestão de condominio pedromag
                </h2>
                <h4 className="text-white text-sm px-3 mt-1">
                  Nosso sistema de gestão de condomínios garante uma administração eficiente e harmoniosa, 
                  facilitando a comunicação, promovendo transparência, assegurando segurança e bem-estar, 
                  e automatizando tarefas administrativas para liberar tempo e recursos, 
                  resultando em um ambiente mais organizado e seguro para todos.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-10 pt-2 bg-white">
        <div className="w-full max-w-md space-y-4">
          {/* Boas-vindas e descrição */}
          <div className="w-full flex flex-col justify-center items-center">
            <Image
              alt="User condomain"
              className="w-[250px] h-auto object-cover"
              src={logo}
              style={{
                aspectRatio: "128/128",
                objectFit: "cover",
              }}
            />
            {/* <img
              alt="User condomain"
              className="w-16 h-16 object-cover"
              src={logo.src}
              style={{
                aspectRatio: "128/128",
                objectFit: "cover",
              }}
            /> */}
            <h2 className="text-lg font-bold text-gray-900">
              Iniciar sessão
            </h2>
            <p className="mt-0 text-sm text-gray-600 px-4">
              Inicie sessão para poder usar e beneficiar-se do nosso sistema!
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onsubmit)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="email-address" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  {...form.register("email")}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Seu email"
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  {...form.register("password")}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Sua senha"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Relembrar-me
                </Label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>
            <div>
            <Button
                type="submit"
                disabled={isPadding}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isPadding ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                    ></path>
                  </svg>
                ) : (
                  "Iniciar sessão"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Page;