// "use client";

// import Link from 'next/link';
// import { useLogin } from '@/helpers/single/sign-in/hooks/login';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { AlertCircle } from 'lucide-react';
// import { Toaster } from '@/components/ui/toaster';

// const Page = () => {
//   const { form, isPadding, message, onsubmit } = useLogin();

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
//               {message && message.message && (
//                 <div className={`rounded-md p-2 pl-4 pr-4 text-sm mb-3 ${message.type === "error" ? "bg-red-300 text-black" : "bg-gray-200 text-black"}`}>
//                   {message.message}
//                 </div>
//               )}
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

import Link from 'next/link';
import { useLogin } from '@/helpers/single/sign-in/hooks/login';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

const Page = () => {
  const { form, isPadding, onsubmit } = useLogin();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <div className="flex items-center space-x-2 mb-7">
            <div className="w-6 h-6 bg-blue-500 rounded-full" />
            <span className="text-xl font-semibold">Pedromag</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Login.
            <br />
            Bem-vindo a Pedromag.
          </h1>
          <p className="text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua.{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
        <div className="w-full md:w-1/2 md:ml-8">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="Digite seu email"
                    disabled={isPadding}
                    {...form.register("email")}
                    className={`font-medium text-sm w-full h-11 px-4 border-slate-300 focus:!ring-2 ${form.formState.errors.email ? '!ring-2 !ring-red-500' : '!ring-blue-800'}`}
                  />
                  {form.formState?.errors?.email && (
                    <div className='flex text-red-500 items-center mt-1'>
                      <AlertCircle className='w-4 h-4 mr-1' />
                      <span>{form.formState.errors.email?.message}</span>
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
                    disabled={isPadding}
                    {...form.register("password")}
                    className={`font-medium text-sm w-full h-11 px-4 border-slate-300 focus:!ring-2 ${form.formState.errors.password ? '!ring-2 !ring-red-500' : '!ring-blue-800'}`}
                  />
                  {form.formState.errors.password && (
                    <div className='flex text-red-600 items-center mt-1'>
                      <AlertCircle className='w-4 h-4 mr-1' />
                      <span>{form.formState.errors.password.message}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" disabled={isPadding} />
                    <span className="ml-2 text-sm text-gray-600">Lembre-se de mim</span>
                  </label>
                  <a href="#" className="text-sm text-blue-500 hover:underline">Esqueceu a senha?</a>
                </div>

                <Button className="w-full" disabled={isPadding}>{isPadding ? "Carregando..." : "Iniciar sessão"}</Button>
              </form>
            </CardContent>
          </Card>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Não tem uma conta?</span>{" "}
            <Link href="/signup" className="text-sm text-blue-500 hover:underline">Cadastre-se</Link>
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}

export default Page;