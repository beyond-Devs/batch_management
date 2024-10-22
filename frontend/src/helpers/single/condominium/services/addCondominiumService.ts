import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";
import { CondominiumData } from '../interfaces/condominiumData.interface';

const axios = createAxiosInstance();

export const addCondominium = async (condominium: CondominiumData) => {
    return axios.post('/condominiums', condominium);
};