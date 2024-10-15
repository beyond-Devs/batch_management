// // "use client";

// // import Link from 'next/link';
// // import { useLogin } from '@/helpers/single/sign-in/hooks/login';
// // import { Input } from '@/components/ui/input';
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { AlertCircle } from 'lucide-react';
// // import { Toaster } from '@/components/ui/toaster';

// // const Page = () => {
// //   const { form, isPadding, message, onsubmit } = useLogin();

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
// //       <main className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between">
// //         <div className="w-full md:w-1/2 mb-8 md:mb-0">
// //           <div className="flex items-center space-x-2 mb-7">
// //             <div className="w-6 h-6 bg-blue-500 rounded-full" />
// //             <span className="text-xl font-semibold">Pedromag</span>
// //           </div>
// //           <h1 className="text-4xl font-bold mb-4">
// //             Login.
// //             <br />
// //             Bem-vindo a Pedromag.
// //           </h1>
// //           <p className="text-gray-600 mb-8">
// //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
// //             magna aliqua.{" "}
// //             <Link href="/signup" className="text-blue-500 hover:underline">
// //               Cadastre-se
// //             </Link>
// //           </p>
// //         </div>
// //         <div className="w-full md:w-1/2 md:ml-8">
// //           <Card>
// //             <CardContent className="p-6">
// //               {message && message.message && (
// //                 <div className={`rounded-md p-2 pl-4 pr-4 text-sm mb-3 ${message.type === "error" ? "bg-red-300 text-black" : "bg-gray-200 text-black"}`}>
// //                   {message.message}
// //                 </div>
// //               )}
// //               <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
// //                 <div>
// //                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
// //                     Email
// //                   </label>
// //                   <Input
// //                     id="email"
// //                     type="text"
// //                     placeholder="Digite seu email"
// //                     disabled={isPadding}
// //                     {...form.register("email")}
// //                     className={`font-medium text-sm w-full h-11 px-4 border-slate-300 focus:!ring-2 ${form.formState.errors.email ? '!ring-2 !ring-red-500' : '!ring-blue-800'}`}
// //                   />
// //                   {form.formState?.errors?.email && (
// //                     <div className='flex text-red-500 items-center mt-1'>
// //                       <AlertCircle className='w-4 h-4 mr-1' />
// //                       <span>{form.formState.errors.email?.message}</span>
// //                     </div>
// //                   )}
// //                 </div>

// //                 <div>
// //                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
// //                     Senha
// //                   </label>
// //                   <Input
// //                     id="password"
// //                     type="password"
// //                     placeholder="Digite sua senha"
// //                     disabled={isPadding}
// //                     {...form.register("password")}
// //                     className={`font-medium text-sm w-full h-11 px-4 border-slate-300 focus:!ring-2 ${form.formState.errors.password ? '!ring-2 !ring-red-500' : '!ring-blue-800'}`}
// //                   />
// //                   {form.formState.errors.password && (
// //                     <div className='flex text-red-600 items-center mt-1'>
// //                       <AlertCircle className='w-4 h-4 mr-1' />
// //                       <span>{form.formState.errors.password.message}</span>
// //                     </div>
// //                   )}
// //                 </div>

// //                 <div className="flex items-center justify-between">
// //                   <label className="flex items-center">
// //                     <input type="checkbox" className="form-checkbox" disabled={isPadding} />
// //                     <span className="ml-2 text-sm text-gray-600">Lembre-se de mim</span>
// //                   </label>
// //                   <a href="#" className="text-sm text-blue-500 hover:underline">Esqueceu a senha?</a>
// //                 </div>

// //                 <Button className="w-full" disabled={isPadding}>{isPadding ? "Carregando..." : "Iniciar sessão"}</Button>
// //               </form>
// //             </CardContent>
// //           </Card>
// //           <div className="mt-4 text-center">
// //             <span className="text-sm text-gray-600">Não tem uma conta?</span>{" "}
// //             <Link href="/signup" className="text-sm text-blue-500 hover:underline">Cadastre-se</Link>
// //           </div>
// //         </div>
// //       </main>
// //       <Toaster />
// //     </div>
// //   );
// // }

// // export default Page;

// "use client";

// import Link from 'next/link';
// import { useLogin } from '@/helpers/single/sign-in/hooks/login';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { AlertCircle } from 'lucide-react';
// import { Toaster } from '@/components/ui/toaster';

// const Page = () => {
//   const { form, isPadding, onsubmit } = useLogin();

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
//       <main className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between">
//         <div className="w-full md:w-1/2 mb-8 md:mb-0">
//           <div className="flex items-center space-x-2 mb-7">
//             <div className="w-6 h-6 bg-blue-500 rounded-full" />
//             <span className="text-xl font-semibold">Pedromag</span>
//           </div>
//           <h1 className="text-4xl font-bold mb-4">
//             Login.
//             <br />
//             Bem-vindo a Pedromag.
//           </h1>
//           <p className="text-gray-600 mb-8">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
//             magna aliqua.{" "}
//             <Link href="/signup" className="text-blue-500 hover:underline">
//               Cadastre-se
//             </Link>
//           </p>
//         </div>
//         <div className="w-full md:w-1/2 md:ml-8">
//           <Card>
//             <CardContent className="p-6">
//               <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <Input
//                     id="email"
//                     type="text"
//                     placeholder="Digite seu email"
//                     disabled={isPadding}
//                     {...form.register("email")}
//                     className={`font-medium text-sm w-full h-11 px-4 border-slate-300 focus:!ring-2 ${form.formState.errors.email ? '!ring-2 !ring-red-500' : '!ring-blue-800'}`}
//                   />
//                   {form.formState?.errors?.email && (
//                     <div className='flex text-red-500 items-center mt-1'>
//                       <AlertCircle className='w-4 h-4 mr-1' />
//                       <span>{form.formState.errors.email?.message}</span>
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                     Senha
//                   </label>
//                   <Input
//                     id="password"
//                     type="password"
//                     placeholder="Digite sua senha"
//                     disabled={isPadding}
//                     {...form.register("password")}
//                     className={`font-medium text-sm w-full h-11 px-4 border-slate-300 focus:!ring-2 ${form.formState.errors.password ? '!ring-2 !ring-red-500' : '!ring-blue-800'}`}
//                   />
//                   {form.formState.errors.password && (
//                     <div className='flex text-red-600 items-center mt-1'>
//                       <AlertCircle className='w-4 h-4 mr-1' />
//                       <span>{form.formState.errors.password.message}</span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <label className="flex items-center">
//                     <input type="checkbox" className="form-checkbox" disabled={isPadding} />
//                     <span className="ml-2 text-sm text-gray-600">Lembre-se de mim</span>
//                   </label>
//                   <a href="#" className="text-sm text-blue-500 hover:underline">Esqueceu a senha?</a>
//                 </div>

//                 <Button className="w-full" disabled={isPadding}>{isPadding ? "Carregando..." : "Iniciar sessão"}</Button>
//               </form>
//             </CardContent>
//           </Card>
//           <div className="mt-4 text-center">
//             <span className="text-sm text-gray-600">Não tem uma conta?</span>{" "}
//             <Link href="/signup" className="text-sm text-blue-500 hover:underline">Cadastre-se</Link>
//           </div>
//         </div>
//       </main>
//       <Toaster />
//     </div>
//   );
// }

// export default Page;

"use client";

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLogin } from "@/helpers/single/sign-in/hooks/login";
import { Rocket, Clock, Star, FileText } from "lucide-react"
import avatar from "@/assets/midea/app/avatar-2.png"
import logo from "@/assets/midea/app/pedromag.png"
import { Toaster } from "@/components/ui/toaster";


const Page = () => {
  const { form, isPadding, onsubmit } = useLogin();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Esquerda com ícones e imagem */}
      <div className="flex-1 flex items-center justify-center p-8 righ-waves" >
        <div className="relative w-full max-w-md">
          {/* Bolhas de fundo animadas */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

          <div className="m-4 relative space-y-4">
            {/* Ícones de destaque */}
            {/* <div className="flex items-center justify-center space-x-2">
              <Rocket className="w-8 h-8 text-purple-500" />
              <Clock className="w-12 h-12 text-blue-400" />
              <Star className="w-6 h-6 text-yellow-400" />
              <FileText className="w-10 h-10 text-green-400" />
            </div> */}

            {/* Avatar de usuário */}
            <div className="p-5 bg-transparent rounded-lg items-center justify-center">
              <div className="w-full h-full flex-shrink-0 block items-center justify-center">
                <img
                  alt="User avatar"
                  className="w-full h-full object-cover"
                  src={avatar.src}
                  style={{
                    aspectRatio: "128/128",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário de Login */}
      <div className="flex-1 flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Boas-vindas e descrição */}
          <div className="text-justify">
            <img
              alt="User avatar"
              className="w-16 h-16 object-cover"
              src={logo.src}
              style={{
                aspectRatio: "128/128",
                objectFit: "cover",
              }}
            />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Bem-vindo a Pedromag 👋
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Inicie sessão para poder usar e beneficiar-se do nosso sistema!
            </p>
          </div>

          {/* Formulário */}
          <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onsubmit)}>
            <div className="rounded-md shadow-sm -space-y-px">
              {/* Campo de Email */}
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

              {/* Campo de Senha */}
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

            {/* Lembrar-me e Esqueci Senha */}
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

            {/* Botão de Login */}
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