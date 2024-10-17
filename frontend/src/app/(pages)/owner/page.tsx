"use client"

import React, { useState } from 'react';
import createAxiosInstance from '@/helpers/global/services/axios/axios.instance';

const AddOwner = () => {
    const [fullName, setFullName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const axios = createAxiosInstance();

    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/owners', { full_name: fullName, contact, email });
            alert('Proprietário adicionado com sucesso');
            setFullName('');
            setContact('');
            setEmail('');
        } catch (error) {
            alert('Erro ao adicionar proprietário');
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome Completo</label>
                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Contato (Opcional)</label>
                <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                />
            </div>
            <div>
                <label>Email (Opcional)</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Adicionando...' : 'Adicionar Proprietário'}
            </button>
        </form>
    );
};
export default AddOwner;
