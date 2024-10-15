"use client"

import { useState, useEffect } from "react"
import axios from 'axios';
const CondominiumsList = () => {
    const [condominiums, setCondominiums] = useState([]);
    useEffect(() => {
        const fetchCondominiums = async () => {
            const response = await axios.get('/condominiums');
            setCondominiums(response.data);
        };
        fetchCondominiums();
    }, []);
    return (
        <div>
            <h1>Lista de Condomínios</h1>
            {condominiums.map((condominium) => (
                <div key={condominium.id}>
                    <h2>{condominium.name}</h2>
                    <p>{condominium.location}</p>
                    {condominium.streets && condominium.streets.length > 0 ? (
                        <div>
                            <h3>Ruas:</h3>
                            {condominium.streets.map((street) => (
                                <div key={street.id}>
                                    <h4>{street.name}</h4>
                                    {street.lots && street.lots.length > 0 ? (
                                        <div>
                                            <h5>Lotes:</h5>
                                            <ul>
                                                {street.lots.map((lot) => (
                                                    <li key={lot.id}>
                                                        Lote {lot.lot_number} - {lot.status}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <p>Sem lotes cadastrados</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Sem ruas cadastradas</p>
                    )}
                </div>
            ))}
        </div>
    );
};
export default CondominiumsList;