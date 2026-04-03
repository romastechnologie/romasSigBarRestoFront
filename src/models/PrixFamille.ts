export interface PrixFamille {
    id: number;
    dateDebut: string;
    statut: boolean;
    dateFinDatefin: string | null;
    famille: { id: number; libelle: string };
    produitConditionnement: { id: number; nomProCond: string };
    prix:number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    // photo: string;
    // nomMedia: string;
    // typeMedia: string;
    // extension: string;
    // idTable: number;
    // nomTable: string;
    setFieldValue: (field: string, value: any) => void;
}