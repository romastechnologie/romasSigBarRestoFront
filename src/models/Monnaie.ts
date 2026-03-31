export interface Monnaie {
    id: number;
    libelle: string;
    valeur: number;
    // monnaieCaisseIds: number[]; 
    // billetageIds: number[]; 
    // createdAt: string
    // updatedAt: string
    // deletedAt: string
        setFieldValue: (field: string, value: any) => void;


}