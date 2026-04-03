export interface CategorieClient {
    id: number;
    code: string;
    libelle: string;
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