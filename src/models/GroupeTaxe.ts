export  interface GroupeTaxe {
    id: number;
    code:string;
    libelle: string;
    typeTaxe: string;
    setFieldValue: (field: string, value: any) => void;
  }