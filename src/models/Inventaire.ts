export  interface Inventaire {
    id: number;
    dateDebut: string;
    dateFin: string;
    inventaireGlobal: string;
    setFieldValue: (field: string, value: any) => void;
  }