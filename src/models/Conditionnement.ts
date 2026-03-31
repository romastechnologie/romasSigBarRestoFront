export  interface Conditionnement {
    id: number;
    code: string;
    libelle: string;
    valeur: number;
    setFieldValue: (field: string, value: any) => void;
  }