"use client"

import { useState, useEffect } from 'react';
import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";


const OccupanciesList = () => {
    const [occupancies, setOccupancies] = useState([]);
    
    const axios = createAxiosInstance();
    
    useEffect(() => {
        const fetchOccupancies = async () => {
            const response = await axios.get('/occupancies');
            setOccupancies(response.data);
        };
        fetchOccupancies();
    }, []);
    return (
        <div>
            <h1>Lista de Ocupações</h1>
            {occupancies.length === 0 ? (
                <p>Nenhuma ocupação registrada</p>
            ) : (
                <ul>
                    {occupancies.map((occupancy) => (
                        <li key={occupancy.id}>
                            <h2>
                                Lote {occupancy.lot?.lot_number} (Rua: {occupancy.lot?.street?.name || 'Sem Rua'})
                            </h2>
                            <p>Proprietário: {occupancy.owner?.full_name}</p>
                            <p>Data de Ocupação: {new Date(occupancy.occupancy_date).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default OccupanciesList;