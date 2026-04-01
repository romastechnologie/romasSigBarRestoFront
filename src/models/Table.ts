export  interface Table {
  id: number;
  libelle: string;
  code: string;
  nombrePlace: number;
  
  setFieldValue: (field: string, value: any) => void;
}