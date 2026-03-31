export  interface Depot {
    id: number;
    dateDepot:Date
    montant:number
    beneficiaire:string
    modeReglement:string
    typeMouvement: string;
    setFieldValue: (field: string, value: any) => void;
  }