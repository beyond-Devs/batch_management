// import { useState } from 'react';
// import { SCH_signup_Props, SCH_signup } from '@/helpers/single/sign-up/schemas/sign.zod.schema';
// import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";
// import { ZodError } from 'zod';
// import { signIn } from 'next-auth/react';

// interface SignupData {
//     full_name?: string;
//     email?: string;
//     password?: string;
//     role?: "admin" | "user";
// }

// const useSignup = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const signup = async (data: SCH_signup_Props) => {
//         try {
//             const validatedData = SCH_signup.parse(data);
//             setLoading(true);
//             setError(null);

//             const { confirmPassword, ...dataWithoutConfirmPassword } = validatedData;

//             const payload: SignupData = {
//                 full_name: dataWithoutConfirmPassword.full_name,
//                 email: dataWithoutConfirmPassword.email,
//                 password: dataWithoutConfirmPassword.password,
//                 role: dataWithoutConfirmPassword.role,
//             };

//             const axios = createAxiosInstance();
//             const response = await axios.post('/users', payload);

//             const sign = await signIn("credentials", {
//                 email: dataWithoutConfirmPassword.email,
//                 password: dataWithoutConfirmPassword.password,
//                 redirect: false,
//             });

//             if (sign?.ok) {
//                 window.location.assign("/?welcome=" + String(response.data?.user?.name));
//             }

//             return response.data;
//         } catch (err: any) {
//             if (err instanceof ZodError) {
//                 const passwordError = err.errors.find(error => error.path.includes("password"));
                
//                 if (passwordError) {
//                     setError(passwordError.message); 
//                 } else {
//                     setError("Erro de validação. Verifique os campos e tente novamente.");
//                 }
//             } else if (err.response && err.response.data) {
//                 setError(err.response.data.message || "Erro ao cadastrar");
//             } else {
//                 setError(err.message || "Erro ao cadastrar");
//             }

//             return err.response.data.message;
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { signup, loading, error };
// };

// export default useSignup;

import { useState } from 'react';
import { SCH_signup_Props, SCH_signup } from '@/helpers/single/sign-up/schemas/sign.zod.schema';
import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";
import { ZodError } from 'zod';
import { signIn } from 'next-auth/react';

interface SignupData {
    full_name?: string;
    email?: string;
    password?: string;
    role?: "admin" | "user";
}

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signup = async (data: SCH_signup_Props) => {
        try {
            const validatedData = SCH_signup.parse(data);
            setLoading(true);
            setError(null);

            const { confirmPassword, ...dataWithoutConfirmPassword } = validatedData;

            const payload: SignupData = {
                full_name: dataWithoutConfirmPassword.full_name,
                email: dataWithoutConfirmPassword.email,
                password: dataWithoutConfirmPassword.password,
                role: dataWithoutConfirmPassword.role,
            };

            const axios = createAxiosInstance();
            const response = await axios.post('/users', payload);

            const sign = await signIn("credentials", {
                email: dataWithoutConfirmPassword.email,
                password: dataWithoutConfirmPassword.password,
                redirect: false,
            });

            if (sign?.ok) {
                window.location.assign("/?welcome=" + String(response.data?.user?.name));
            }

            return response.data;
        } catch (err: any) {
            if (err instanceof ZodError) {
                const passwordError = err.errors.find(error => error.path.includes("password"));
                
                if (passwordError) {
                    setError(passwordError.message); 
                } else {
                    setError("Erro de validação. Verifique os campos e tente novamente.");
                }
            } else if (err.response && err.response.data) {
                setError(err.response.data.message || "Erro ao cadastrar");
            } else {
                setError(err.message || "Erro ao cadastrar");
            }

            return null; 
        } finally {
            setLoading(false);
        }
    };

    return { signup, loading, error };
};

export default useSignup;