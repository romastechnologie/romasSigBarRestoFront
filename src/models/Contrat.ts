export  interface Contrat {
    id: number;
    dateContrat: Date;
    dureeCreance: string;
    plafond: string;
    setFieldValue: (field: string, value: any) => void;
  }