"use client";

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; 
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'; 
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'; 
import createAxiosInstance from '@/helpers/global/services/axios/axios.instance';

interface Condominium {
  id: string;
  name: string;
  totalLots: number;
  streets: Street[];
}

interface Street {
  id: string;
  name: string;
  lots: Lot[];
}

interface Lot {
  id: string;
  description: string;
  status: string;
}

interface Owner {
  id: string;
  full_name: string;
}

interface Occupancy {
  lot_id: string;
  owner_id: string;
}

const CondominiumDetails = () => {
  const [condominiums, setCondominiums] = useState<Condominium[]>([]);
  const [selectedCondominiumId, setSelectedCondominiumId] = useState<string | null>(null);  
  const [owners, setOwners] = useState<Owner[]>([]);  
  const [openModal, setOpenModal] = useState(false);  
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);  
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const [notificationType, setNotificationType] = useState<'success' | 'error' | null>(null);

  const axios = createAxiosInstance();

  useEffect(() => {
    fetchCondominiums();
    fetchOwners();
  }, []);

  const fetchCondominiums = async () => {
    try {
      const response = await axios.get('/condominiums');
      setCondominiums(response.data || []);
    } catch (error) {
      console.error('Erro ao buscar condomínios:', error);
    }
  };

  const fetchOwners = async () => {
    try {
      const response = await axios.get('/owners');
      setOwners(response.data || []);
    } catch (error) {
      console.error('Erro ao buscar proprietários:', error);
    }
  };

  const selectOwner = async (lotId: string, ownerId: string) => {
    try {
      await axios.patch(`/lots/${lotId}`, { status: 'Occupied' });

      await axios.post<Occupancy>('/occupancies', {
        lot_id: lotId,
        owner_id: ownerId
      });

      setCondominiums(prevCondominiums => prevCondominiums.map(condominium => {
        if (condominium.id === selectedCondominiumId) {
          return {
            ...condominium,
            streets: condominium.streets.map(street => ({
              ...street,
              lots: street.lots.map(lot => 
                lot.id === lotId ? { ...lot, status: 'Occupied' } : lot
              )
            }))
          };
        }
        return condominium;
      }));

      setNotificationMessage('Ocupação salva com sucesso!');
      setNotificationType('success');
      setOpenModal(false);
    } catch (error) {
      setNotificationMessage('Erro ao salvar ocupação!');
      setNotificationType('error');
      console.error('Erro ao salvar ocupação:', error);
    }
  };

  const filterUniqueStreetsWithLots = (streets: Street[]) => {
    const seen: { [key: string]: boolean } = {};
    return streets.filter(street => {
      if (street.lots.length === 0 || seen[street.name]) {
        return false;
      }
      seen[street.name] = true;
      return true;
    });
  };

  const renderLotes = (lots: Lot[]) => {
    if (!Array.isArray(lots)) return null;

    return lots.map((lot, index) => {
      const isOccupied = lot.status === 'Occupied';
      const lotStatusText = isOccupied ? 'Ocupado' : 'Disponível'; 

      return (
        <div
          key={`${lot.id}-${index}`}
          className={`p-2 border text-center border-gray-300 rounded shadow cursor-pointer ${isOccupied ? 'bg-green-400' : 'hover:bg-gray-200'}`}
          onClick={() => {
            if (!isOccupied) {
              setSelectedLot(lot);
              setOpenModal(true);
            }
          }}
        >
          <span className={`text-sm text-center ${isOccupied ? 'font-bold text-green-500' : ''}`}>
            {lot.description} {lotStatusText} 
          </span>
        </div>
      );
    });
  };

  return (
    <div className="bg-transparent min-h-screen flex flex-col items-center justify-start p-0 sm:p-4">
      <Select onValueChange={(value) => setSelectedCondominiumId(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione um condomínio" />
        </SelectTrigger>
        <SelectContent>
          {Array.isArray(condominiums) && condominiums.map(condominium => (
            <SelectItem key={condominium.id} value={condominium.id}>
              {condominium.name} (Total de Lotes: {condominium.totalLots})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedCondominiumId && (
        <Card className="w-full mt-2">
          <CardHeader className="text-right p-2 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">
              {condominiums.find(condo => condo.id === selectedCondominiumId)?.name || 'Condomínio'}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-2 sm:space-y-4 p-2 sm:p-6">
            {Array.isArray(condominiums.find(condo => condo.id === selectedCondominiumId)?.streets) && 
              filterUniqueStreetsWithLots(condominiums.find(condo => condo.id === selectedCondominiumId)?.streets || []).map((street, index) => (
              <div key={`${street.id}-${index}`} className="flex flex-col w-full">
                <div className="w-full text-center py-1 bg-gray-200 border border-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
                  {street.name}
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1 sm:gap-2">
                  {renderLotes(street.lots)} 
                </div>
              </div>
            ))}
            <div className="text-center text-xs sm:text-sm">LOTEAMENTO</div>
          </CardContent>
        </Card>
      )}

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>{selectedLot?.description || 'Selecione um lote'}</DialogTitle>
          </DialogHeader>
          <p className="mb-4 text-sm sm:text-base">Selecione o proprietário para este lote:</p>
          <Select onValueChange={(value) => selectOwner(selectedLot?.id || '', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um proprietário" />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(owners) && owners.map(owner => (
                <SelectItem key={owner.id} value={owner.id}>{owner.full_name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </DialogContent>
      </Dialog>

      {notificationMessage && (
        <Dialog open={!!notificationMessage} onOpenChange={() => setNotificationMessage(null)}>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle>
                {notificationType === 'success' ? 'Sucesso' : 'Erro'}
              </DialogTitle>
            </DialogHeader>
            <p>{notificationMessage}</p>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CondominiumDetails;


// "use client";

// import { useEffect, useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; 
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'; 
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'; 
// import createAxiosInstance from '@/helpers/global/services/axios/axios.instance';

// interface Condominium {
//   id: string;
//   name: string;
//   totalLots: number;
//   streets: Street[];
// }

// interface Street {
//   id: string;
//   name: string;
//   lots: Lot[];
// }

// interface Lot {
//   id: string;
//   name: string;
//   status: string;
// }

// interface Owner {
//   id: string;
//   full_name: string;
// }

// interface Occupancy {
//   lot_id: string;
//   owner_id: string;
// }

// const CondominiumDetails = () => {
//   const [condominiums, setCondominiums] = useState<Condominium[]>([]);
//   const [selectedCondominiumId, setSelectedCondominiumId] = useState<string | null>(null);  
//   const [owners, setOwners] = useState<Owner[]>([]);  
//   const [openModal, setOpenModal] = useState(false);  
//   const [selectedLot, setSelectedLot] = useState<Lot | null>(null);  

//   const axios = createAxiosInstance();

//   useEffect(() => {
//     fetchCondominiums();
//     fetchOwners();
//   }, []);

//   const fetchCondominiums = async () => {
//     try {
//       const response = await axios.get('/condominiums');
//       setCondominiums(response.data || []);

//       console.log(response.data)
//     } catch (error) {
//       console.error('Erro ao buscar condomínios:', error);
//     }
//   };

//   const fetchOwners = async () => {
//     try {
//       const response = await axios.get('/owners');
//       setOwners(response.data || []);
//     } catch (error) {
//       console.error('Erro ao buscar proprietários:', error);
//     }
//   };

//   const selectOwner = async (lotId: string, ownerId: string) => {
//     try {
//       const response = await axios.post<Occupancy>('/occupancies', {
//         lot_id: lotId,
//         owner_id: ownerId
//       });
//       console.log('Ocupação salva com sucesso:', response.data);
//       setOpenModal(false);
//     } catch (error) {
//       console.error('Erro ao salvar ocupação:', error);
//     }
//   };

//   // Filtra ruas com nomes duplicados pelo nome
//   const filterUniqueStreets = (streets: Street[]) => {
//     const seen: { [key: string]: boolean } = {};
//     return streets.filter(street => {
//       if (seen[street.name]) {
//         return false; 
//       }
//       seen[street.name] = true;
//       return true;
//     });
//   };

//   const renderLotes = (lots: Lot[]) => {
//     return Array.isArray(lots) ? lots.map((lot, index) => (
//       <div key={`${lot.id}-${index}`} className="p-2 border border-gray-300 rounded shadow">
//         <span>{lot.name} - {lot.status}</span>
//         <button
//           onClick={() => {
//             setSelectedLot(lot);
//             setOpenModal(true);
//           }}
//           className="ml-2 text-blue-500 underline"
//         >
//           Selecionar
//         </button>
//       </div>
//     )) : null;
//   };

//   return (
//     <div className="bg-transprent min-h-screen flex flex-col items-center justify-start p-0 sm:p-4">
//       <Select onValueChange={(value) => setSelectedCondominiumId(value)}>
//         <SelectTrigger className="w-full">
//           <SelectValue placeholder="Selecione um condomínio" />
//         </SelectTrigger>
//         <SelectContent>
//           {Array.isArray(condominiums) && condominiums.map(condominium => (
//             <SelectItem key={condominium.id} value={condominium.id}>
//               {condominium.name} (Total de Lotes: {condominium.totalLots})
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       {selectedCondominiumId && (
//         <Card className="w-full mt-2">
//           <CardHeader className="text-right p-2 sm:p-6">
//             <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">
//               {condominiums.find(condo => condo.id === selectedCondominiumId)?.name || 'Condomínio'}
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col space-y-2 sm:space-y-4 p-2 sm:p-6">
//             {Array.isArray(condominiums.find(condo => condo.id === selectedCondominiumId)?.streets) && 
//               filterUniqueStreets(condominiums.find(condo => condo.id === selectedCondominiumId)?.streets || []).map((street, index) => (
//               <div key={`${street.id}-${index}`} className="flex flex-col w-full">
//                 <div className="w-full text-center py-1 bg-gray-200 border border-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
//                   {street.name}
//                 </div>
//                 <div className="grid grid-cols-4 sm:grid-cols-7 gap-1 sm:gap-2">
//                   {renderLotes(street.lots)}
//                 </div>
//               </div>
//             ))}
//             <div className="text-center text-xs sm:text-sm">LOTEAMENTO</div>
//           </CardContent>
//         </Card>
//       )}

//       <Dialog open={openModal} onOpenChange={setOpenModal}>
//         <DialogContent className="sm:max-w-[425px] bg-white">
//           <DialogHeader>
//             <DialogTitle>{selectedLot?.name || 'Selecione um lote'}</DialogTitle>
//           </DialogHeader>
//           <p className="mb-4 text-sm sm:text-base">Selecione o proprietário para este lote:</p>
//           <Select onValueChange={(value) => selectOwner(selectedLot?.id || '', value)}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Selecione um proprietário" />
//             </SelectTrigger>
//             <SelectContent>
//               {Array.isArray(owners) && owners.map(owner => (
//                 <SelectItem key={owner.id} value={owner.id}>{owner.full_name}</SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default CondominiumDetails;


//##################################

// "use client";

// import React, { useState, useEffect } from "react";
// import createAxiosInstance from "@/helpers/global/services/axios/axios.instance";

// const AddOccupancy = () => {
//   const [lotId, setLotId] = useState("");
//   const [ownerId, setOwnerId] = useState("");
//   const [lots, setLots] = useState([]);
//   const [owners, setOwners] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const axios = createAxiosInstance();

//   // Busca os lotes e proprietários
//   useEffect(() => {
//     const fetchData = async () => {
//       const lotsResponse = await axios.get("/lots");
//       const ownersResponse = await axios.get("/owners");
//       setLots(lotsResponse.data);
//       setOwners(ownersResponse.data);
//     };
//     fetchData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // Primeiro, registrar a ocupação
//       await axios.post("/occupancies", {
//         lot_id: Number(lotId),
//         owner_id: Number(ownerId)
//       });

//       // Em seguida, atualizar o estado do lote para "Occupied"
//       await axios.patch(`/lots/${lotId}`, {
//         status: "Occupied",
//       });

//       alert("Ocupação registrada e estado do lote atualizado com sucesso");

//       // Resetar os estados do formulário
//       setLotId("");
//       setOwnerId("");
//     } catch (error) {
//       alert("Erro ao registrar a ocupação ou atualizar o estado do lote " + error.reponse);
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Lote</label>
//         <select
//           value={lotId}
//           onChange={(e) => setLotId(e.target.value)}
//           required
//         >
//           <option value="">Selecione um Lote</option>
//           {lots.map((lot) => (
//             <option key={lot.id} value={lot.id}>
//               Lote {lot.lot_number} (Rua: {lot.street?.name || "Sem Rua"})
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label>Proprietário</label>
//         <select
//           value={ownerId}
//           onChange={(e) => setOwnerId(e.target.value)}
//           required
//         >
//           <option value="">Selecione um Proprietário</option>
//           {owners.map((owner) => (
//             <option key={owner.id} value={owner.id}>
//               {owner.full_name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <button type="submit" disabled={loading}>
//         {loading ? "Registrando..." : "Registrar Ocupação"}
//       </button>
//     </form>
//   );
// };

// export default AddOccupancy;
