export  interface CategorieProduit {
    id: number;
    libelle: string;
    categorieProduit: string;
    code: string;
    
    setFieldValue: (field: string, value: any) => void;
  }