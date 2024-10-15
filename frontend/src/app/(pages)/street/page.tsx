"use client"

import React, { useState, useEffect } from 'react';
import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";

const AddStreet = () => {
    const [condominiums, setCondominiums] = useState([]);
    const [condominiumId, setCondominiumId] = useState('');
    const [streetName, setStreetName] = useState('');
    const [loading, setLoading] = useState(false);

    const axios = createAxiosInstance();
    
    useEffect(() => {
        const fetchCondominiums = async () => {
            const response = await axios.get('/condominiums');
            setCondominiums(response.data);
        };
        fetchCondominiums();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/streets', { name: streetName, condominium_id: Number(condominiumId) });
            alert('Rua adicionada com sucesso');
        } catch (error) {
            alert(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Condomínio</label>
                <select value={condominiumId} onChange={(e) => setCondominiumId(e.target.value)} required>
                    <option value="">Selecione um Condomínio</option>
                    {condominiums.map((condominium) => (
                        <option key={condominium.id} value={condominium.id}>
                            {condominium.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Nome da Rua</label>
                <input type="text" value={streetName} onChange={(e) => setStreetName(e.target.value)} required />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Adicionando...' : 'Adicionar Rua'}
            </button>
        </form>
    );
};
export default AddStreet;