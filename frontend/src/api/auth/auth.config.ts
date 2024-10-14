// import { NextAuthOptions } from "next-auth";
// import { JWT } from "next-auth/jwt";
// import CredentialsProvider from "next-auth/providers/credentials";
// import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";


// const axios = createAxiosInstance(); 

// async function refreshToken(token: JWT): Promise<JWT> {

// const res = await axios.post("/auth/refresh",{},{
//     headers:{
//         Authorization: `Refresh ${token.backendTokens.refreshToken}`,
//     }
// })
//   console.log("refreshed");

//   const response = await res.data;

//   return {
//     ...token,
//     backendTokens: response,
//   };
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: {
//           label: "Username",
//           type: "text",
//           placeholder: "jsmith",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         if (!credentials?.username || !credentials?.password) return null;
//         const { username, password } = credentials;
//         const res = await axios.post("/login", {
//             email: username,
//             password,
//         });
//         if (res.status == 401) {
//           console.log(res.statusText);

//           return null;
//         }
//         const user = await res.data;
//         return user;
//       },
//     }),

//   ],
//   pages:{
//     signIn: "/login",
//     error: "/error"
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) return { ...token, ...user };

//       if (new Date().getTime() < token.backendTokens.expiresIn)
//         return token;

//       return await refreshToken(token);
//     },

//     async session({ token, session }) {
//       session.user = token.user;
//       session.backendTokens = token.backendTokens;

//       return session;
//     },
//   },
// };



import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";

const axios = createAxiosInstance(); 

async function refreshToken(token: JWT): Promise<JWT> {
    // Lógica para atualizar o token, se necessário
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "exemplo@dominio.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    const res = await axios.post("/login", {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    // Verifique se a resposta contém os dados do usuário
                    if (res.status === 200) {
                        const user = res.data.user; // Ajuste de acordo com a estrutura da resposta
                        return user; // Retorne o usuário se a autenticação for bem-sucedida
                    } else {
                        return null; // Se a resposta não for 200, retorne null
                    }
                } catch (error) {
                    console.error("Login error:", error);
                    return null; // Retorne null em caso de erro
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
        error: "/error", // Página de erro personalizada
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user; // Armazene as informações do usuário no token
            }
            return token;
        },
        async session({ token, session }) {
            session.user = token.user; // Passe as informações do usuário para a sessão
            return session;
        },
    },
};
