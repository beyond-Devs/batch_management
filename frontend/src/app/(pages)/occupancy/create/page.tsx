"use client";

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; 
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'; 
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'; 
import createAxiosInstance from '@/helpers/global/services/axios/axios.instance';
import { Condominium, Street, Lot, Owner, Occupancy } from '@/helpers/single/occupancy/interfaces/occupancy.interface';

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
          className={`p-2 border text-center border-gray-300 rounded shadow cursor-pointer ${isOccupied ? 'bg-green-200' : 'hover:bg-gray-200'}`}
          onClick={() => {
            if (!isOccupied) {
              setSelectedLot(lot);
              setOpenModal(true);
            }
          }}
        >
          <span className={`text-sm text-center ${isOccupied ? 'font-bold text-black' : ''}`}>
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