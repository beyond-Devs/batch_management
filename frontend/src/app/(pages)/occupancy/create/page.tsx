"use client"

import React, { useState, useEffect } from 'react';
import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";

const AddOccupancy = () => {
    const [lotId, setLotId] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [occupancyDate, setOccupancyDate] = useState('');
    const [lots, setLots] = useState([]);
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(false);

    const axios = createAxiosInstance();

    // Busca os lotes e proprietários
    useEffect(() => {
        const fetchData = async () => {
            const lotsResponse = await axios.get('/api/lots');
            const ownersResponse = await axios.get('/api/owners');
            setLots(lotsResponse.data);
            setOwners(ownersResponse.data);
        };
        fetchData();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/occupancies', {
                lot_id: lotId,
                owner_id: ownerId,
                occupancy_date: occupancyDate,
            });
            alert('Ocupação registrada com sucesso');
            setLotId('');
            setOwnerId('');
            setOccupancyDate('');
        } catch (error) {
            alert('Erro ao registrar a ocupação');
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Lote</label>
                <select
                    value={lotId}
                    onChange={(e) => setLotId(e.target.value)}
                    required
                >
                    <option value="">Selecione um Lote</option>
                    {lots.map((lot) => (
                        <option key={lot.id} value={lot.id}>
                            Lote {lot.lot_number} (Rua: {lot.street?.name || 'Sem Rua'})
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Proprietário</label>
                <select
                    value={ownerId}
                    onChange={(e) => setOwnerId(e.target.value)}
                    required
                >
                    <option value="">Selecione um Proprietário</option>
                    {owners.map((owner) => (
                        <option key={owner.id} value={owner.id}>
                            {owner.full_name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Data de Ocupação</label>
                <input
                    type="date"
                    value={occupancyDate}
                    onChange={(e) => setOccupancyDate(e.target.value)}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Registrando...' : 'Registrar Ocupação'}
            </button>
        </form>
    );
};
export default AddOccupancy;
