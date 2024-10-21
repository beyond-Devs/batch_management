export interface Condominium {
    id: string;
    name: string;
    totalLots: number;
    streets: Street[];
}

export interface Street {
    id: string;
    name: string;
    lots: Lot[];
}

export interface Lot {
    id: string;
    description: string;
    status: string;
}

export interface Owner {
    id: string;
    full_name: string;
}

export interface Occupancy{
    lot_id: string;
    owner_id: string;
}
