export  interface Fournisseur {
    id: number;
    nomFournisseur: string;
    prenomFournisseur: string;
    telFournisseur1: string;
    telFournisseur2: string;
    email: string;
    sigle: string;
    rccm: string;
    ifu: string;
    denomination: string;
    dateCreation:Date;
    adresseFournisseur: string;
    sexe: string;
    createdAt:Date;
    setFieldValue: (field: string, value: any) => void;
  }