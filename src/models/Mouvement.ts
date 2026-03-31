export  interface Mouvements {
    id: number;
    qte:number;
    observation:string;
    typeOperation:string;
    statut:boolean;
    
    setFieldValue: (field: string, value: any) => void;
  }