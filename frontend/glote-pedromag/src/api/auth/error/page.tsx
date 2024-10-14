"use client";

import { useRouter } from 'next/router';

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;

  let errorMessage = '';

  switch (error) {
    case 'CredentialsSignin':
      errorMessage = 'Erro nas credenciais fornecidas. Verifique seu email e senha.';
      break;
    default:
      errorMessage = 'Ocorreu um erro inesperado. Tente novamente.';
  }

  return (
    <div>
      <h1>Erro</h1>
      <p>{errorMessage}</p>
    </div>
  );
}

export default ErrorPage;