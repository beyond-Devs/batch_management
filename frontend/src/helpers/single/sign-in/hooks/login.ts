// import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";
// import { SCH_login, SCH_login_Props } from "@/helpers/single/sign-in/schemas/login.zod.schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";

// interface Message {
//     type?: "error" | "success" | "warning" | "disabled"
//     message: string
// }

// export function useLogin() {

//     const form = useForm<SCH_login_Props>({
//         resolver: zodResolver(SCH_login),
//         defaultValues: {
//             email: "",
//             password: "",
//         }
//     })

//     const [isPadding, setIsPadding] = useState(false)

//     const [message, setMessage] = useState<Message>()


//     function onsubmit(values: SCH_login_Props) {
//         const { email, password } = values

//         setIsPadding(true)
//         setMessage(null)

//         const axios = createAxiosInstance(); 
//         const res = axios.post('/login', {
//             email,
//             password
//         }, )

//         res.then(async (res) => {
//             console.log(res)
//             try {
//                 const sign = await signIn("credentials", {
//                     email: email,
//                     password,
//                     redirect: false,
//                     // redirectTo: "/welcome=" + String(res.data?.user?.name)
//                 })
//                 //console.log(sign)
                 
//                 if(sign?.ok) return window.location.assign("/?welcome=" + String(res.data?.user?.name))
                    
//             } catch (error) {
//                 console.log(error)
//                 return setMessage({ message: "Alguma coisa aconteceu de forma inesperada, tentenovamente", type: "error" })
//             }
//         }).catch((error) => {
//             // console.log(error)

//             if (error.code === "ERR_NETWORK")
//                 return setMessage({ message: "Erro de conexão, verifique a sua internete ou tente novamente ", type: "error" })

//             if (error.request.status === 0)
//                 return setMessage({ message: "Erro de conexão, verifique a sua internete ou tente novamente", type: "error" })

//             if (error.response.data.statusCode === 401)
//                 return setMessage({ message: error?.response?.data?.message, type: "error" })

//             if (error.response.data.statusCode === 500)
//                 return setMessage({ message: "Alguma coisa aconteceu de forma inesperada, tente novamente", type: "error" })
//         })
//             .finally(() => {
//                 setIsPadding(false)
//             })
//     }

//     return { onsubmit, form, isPadding, message }

// }

import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";
import { SCH_login, SCH_login_Props } from "@/helpers/single/sign-in/schemas/login.zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/helpers/single/sign-in/hooks/use-toast";

interface Message {
    type: "error" | "success" | "warning" | "disabled"
    message: string
}

export function useLogin() {

    const form = useForm<SCH_login_Props>({
        resolver: zodResolver(SCH_login),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const [isPadding, setIsPadding] = useState(false);

    const [message, setMessage] = useState<Message | null>(null);

    function showToast(message: Message) {
        toast({
            variant: message.type === 'error' ? 'destructive' : 'default',
            title: message.type === 'error' ? 'Erro' : 'Sucesso',
            description: message.message,
        });
    }

    function onsubmit(values: SCH_login_Props) {
        const { email, password } = values;

        setIsPadding(true);
        setMessage(null);

        const axios = createAxiosInstance(); 
        const res = axios.post('/login', {
            email,
            password
        });

        res.then(async (res) => {
            try {
                const sign = await signIn("credentials", {
                    email: email,
                    password,
                    redirect: false,
                });

                if (sign?.ok) {
                    window.location.assign("/?dashboard=" + String(res.data?.user?.name));
                }
            } catch (error) {
                const errorMessage = "Alguma coisa aconteceu de forma inesperada, tente novamente";
                setMessage({ message: errorMessage, type: "error" });
                showToast({ message: errorMessage, type: "error" });
            }
        }).catch((error) => {
            let errorMessage = error.response.data.message;
            showToast({ message: errorMessage, type: "error" });
        }).finally(() => {
            setIsPadding(false);
        });
    }

    return { onsubmit, form, isPadding, message };

}
