export  interface User {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  sexe: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  setFieldValue: (field: string, value: any) => void;
}

