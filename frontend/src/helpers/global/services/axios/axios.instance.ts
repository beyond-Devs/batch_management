import { getSession } from 'next-auth/react';
import axios, { AxiosInstance } from 'axios';

const createAxiosInstance = () => {
    const instance = axios.create({
        baseURL: "http://localhost:8000",
        headers: { 
            'X-Custom-Header': 'foobar'
        } 
    });

    instance.interceptors.request.use(
        async (config) => {
            const session: any = await getSession(); 
            
            if (session?.accessToken) {
                config.headers.Authorization = `Bearer ${session.accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    return instance; 
};

export default createAxiosInstance;