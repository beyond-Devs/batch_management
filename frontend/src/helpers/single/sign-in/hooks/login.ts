import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";
import { SCH_login, SCH_login_Props } from "@/helpers/single/sign-in/schemas/login.zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Message {
    type?: "error" | "success" | "warning" | "disabled"
    message: string
}

export function useLogin() {

    const form = useForm<SCH_login_Props>({
        resolver: zodResolver(SCH_login),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const [isPadding, setIsPadding] = useState(false)

    const [message, setMessage] = useState<Message>()


    function onsubmit(values: SCH_login_Props) {
        const { email, password } = values

        setIsPadding(true)
        setMessage({ message: "", type: "disabled" })

        const axios = createAxiosInstance(); 
        const res = axios.post('/login', {
            email,
            password
        }, )

        res.then(async (res) => {
            console.log(res)
            try {
                const sign = await signIn("credentials", {
                    email: email,
                    password,
                    redirect: false,
                    // redirectTo: "/welcome=" + String(res.data?.user?.name)
                })
                //console.log(sign)
                 
                if(sign?.ok) return window.location.assign("/?welcome=" + String(res.data?.user?.name))
                    
            } catch (error) {
            console.log(error)
                return setMessage({ message: "Alguma coisa aconteceu de forma inesperada, tentenovamente", type: "error" })
            }
        }).catch((error) => {
            console.log(error)

            if (error.code === "ERR_NETWORK")
                return setMessage({ message: "Erro de conexão, verifique a sua internete ou tente novamente ", type: "error" })

            if (error.request.status === 0)
                return setMessage({ message: "Erro de conexão, verifique a sua internete ou tente novamente", type: "error" })

            if (error.response.data.statusCode === 401)
                return setMessage({ message: error?.response?.data?.message, type: "error" })

            if (error.response.data.statusCode === 500)
                return setMessage({ message: "Alguma coisa aconteceu de forma inesperada, tente novamente", type: "error" })
        })
            .finally(() => {
                setIsPadding(false)
            })
    }

    return { onsubmit, form, isPadding, message }

}

// import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";
// import { SCH_login, SCH_login_Props } from "@/helpers/single/sign-in/schemas/login.zod.schema";
// import { zodResolver } from "@hookform/resolvers.zod";
// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { ZodError } from 'zod'; 

// interface Message {
//     type?: "error" | "success" | "warning" | "disabled";
//     message: string;
// }

// export function useLogin() {
//     const form = useForm<SCH_login_Props>({
//         resolver: zodResolver(SCH_login),
//         defaultValues: {
//             email: "",
//             password: "",
//         }
//     });

//     const [isPadding, setIsPadding] = useState(false);
//     const [message, setMessage] = useState<Message>();

//     async function onsubmit(values: SCH_login_Props) {
//         const { email, password } = values;

//         setIsPadding(true);
//         setMessage({ message: "", type: "disabled" });

//         try {
//             // Validar os dados com Zod
//             SCH_login.parse(values);

//             const axios = createAxiosInstance();
//             const res = await axios.post('/login', { email, password });

//             // Login via NextAuth
//             const sign = await signIn("credentials", {
//                 email: email,
//                 password,
//                 redirect: false,
//             });

//             if (sign?.ok) {
//                 window.location.assign("/?welcome=" + String(res.data?.user?.name));
//             } else {
//                 setMessage({ message: "Erro ao tentar fazer login. Verifique suas credenciais.", type: "error" });
//             }
//         } catch (err: any) {
//             // Captura erros vindos do Zod (validação)
//             if (err instanceof ZodError) {
//                 const passwordError = err.errors.find((error) => error.path.includes("password"));
                
//                 if (passwordError) {
//                     setMessage({ message: passwordError.message, type: "error" });
//                 } else {
//                     setMessage({ message: "Erro de validação. Verifique os campos e tente novamente.", type: "error" });
//                 }
//             } 
//             // Captura respostas de erro do servidor
//             else if (err.response && err.response.data) {
//                 const apiMessage = err.response.data.message;

//                 if (err.response.status === 400) {
//                     setMessage({ message: apiMessage || "Email e senha são obrigatórios.", type: "error" });
//                 } else if (err.response.status === 401) {
//                     setMessage({ message: apiMessage || "Credenciais inválidas.", type: "error" });
//                 } else {
//                     setMessage({ message: apiMessage || "Erro ao tentar fazer login. Tente novamente mais tarde.", type: "error" });
//                 }
//             } 
//             // Captura erros de rede (exemplo: problemas de conexão)
//             else if (err.code === "ERR_NETWORK") {
//                 setMessage({ message: "Erro de conexão, verifique sua internet e tente novamente.", type: "error" });
//             } 
//             // Captura qualquer outro tipo de erro
//             else {
//                 setMessage({ message: "Ocorreu um erro inesperado. Tente novamente.", type: "error" });
//             }
//         } finally {
//             setIsPadding(false);
//         }
//     }

//     return { onsubmit, form, isPadding, message };
// }