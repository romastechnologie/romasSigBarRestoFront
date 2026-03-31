export interface CategorieObject {
    code: number;
    libelle: string;
    data: Categorie[];
}
export interface Categorie{
  id: number;
  code: string;
  libelle: string;
  createdAt?: string;
  setFieldValue: (field: string, value: any) => void;
}

