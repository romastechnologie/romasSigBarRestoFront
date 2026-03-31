export  interface Creance {
    id: number;
    date: Date;
    dateEchance: Date;
    nbreEcheance:string;
    statut:string;
    motifCreance: string;
    montant: string;
    client:string;
    
    setFieldValue: (field: string, value: any) => void;
  }