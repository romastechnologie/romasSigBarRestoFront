export interface PosteObject {
    code: number;
    libelle: string;
    data: Poste[];
}
export interface Poste{
  id: number;
  code: string;
  libelle: string;
  createdAt?: string;
  setFieldValue: (field: string, value: any) => void;
}

