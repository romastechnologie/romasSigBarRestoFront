export interface PrixProduitCondTypeClient {
    id: number;
    dateDefinition: string;
    statut: boolean;
    dateFinDefinition: string | null;
    categorieClient: { id: number; libelle: string };
    produitConditionnement: { id: number; nomProCond: string };
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