export interface Compte {
  id: number;
  numero: number;
  dateCreation : Date;
  intituleCompte: string;
  soldeInitial: number;
  soldeActuel: number;
  plafond:number;
  typeCompte: string; 
  client: {
    id: number;
    nomClient : string;
  };
    setFieldValue: (field: string, value: any) => void;
  }