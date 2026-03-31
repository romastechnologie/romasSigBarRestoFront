export  interface Reglement {
    id: number;
    date: string;
    refDoc: string;
    restAlivrer: string;
    client: string;
    motifSuivi: number;
    imageBon: string;
    dateOperation:Date;
    typeOperation:string;
    refDocument:string
    statut : string;
    statutPaiement: string
    setFieldValue: (field: string, value: any) => void;
  }