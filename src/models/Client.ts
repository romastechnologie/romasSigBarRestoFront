
export  interface Client {
    id: number;
    nomClient: string;
    prenomClient: string;
    adresseClient:string;
    emailClient:string;
    numeroClient:string;
    telephone1:string;
    telephone2:string;
    dateNais: string;
    raisonSociale:string;
    ifu:string;
    rccm:string;
    sigle:string;
    nomCommercial:string;
    dateCreation: string;
    statut: string;
    personneAContacter:string;
    telephonePersonneAContacter:string;
    civilite:string;
    personneRepresentant:string;
    telephoneRepresentant:string;
    compteClients:string;
    typeCompte:string;
    dateExpedition:string;
    ville:string;
    region:string,
    paysResidence:string,
    gerant:string;
    quartier:string,
    promoteur:string,
    piece:string;
    creance:string;
      creances: {
        id: number;
        montant: number;
        date: string;
        echeances: { date: string; montant: number; rapports: { description: string; dateRelance: string }[]; }[];
      }[];
    setFieldValue: (field: string, value: any) => void;
  }