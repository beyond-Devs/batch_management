"use client"


import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'; 
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';

interface ManageCondominiumDialogProps {
  isOpen: boolean;
  onClose: () => void;
  condominiumId: number;
}

const ManageCondominiumDialog: React.FC<ManageCondominiumDialogProps> = ({ isOpen, onClose, condominiumId }) => {
  const [streetName, setStreetName] = useState('');
  const [lotName, setLotName] = useState('');
  const [lotNumber, setLotNumber] = useState('');

  const handleAddStreet = async () => {
    try {
      const response = await axios.post('/streets', {
        name: streetName,
        condominium_id: condominiumId,
      });
      console.log('Rua adicionada:', response.data);
      setStreetName(''); 
    } catch (error) {
      console.error('Erro ao adicionar a rua:', error);
    }
  };

  const handleAddLot = async () => {
    try {
      const response = await axios.post('/lots', {
        name: lotName,
        lot_number: parseInt(lotNumber),
        street_id: 
      });
      console.log('Lote adicionado:', response.data);
      setLotName(''); 
      setLotNumber('');
    } catch (error) {
      console.error('Erro ao adicionar o lote:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="outline">Gerir Condomínio</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-y-scroll bg-white">
        <DialogHeader>
          <DialogTitle>Gerir Condomínio {condominiumId}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="street-name">Nome da Rua</Label>
            <Input
              id="street-name"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
              placeholder="Digite o nome da rua"
            />
            <Button onClick={handleAddStreet}>Adicionar Rua</Button>
          </div>
          <div>
            <Label htmlFor="lot-name">Nome do Lote</Label>
            <Input
              id="lot-name"
              value={lotName}
              onChange={(e) => setLotName(e.target.value)}
              placeholder="Digite o nome do lote"
            />
            <Label htmlFor="lot-number">Número do Lote</Label>
            <Input
              id="lot-number"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
              placeholder="Digite o número do lote"
              type="number"
            />
            <Button onClick={handleAddLot}>Adicionar Lote</Button>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageCondominiumDialog;