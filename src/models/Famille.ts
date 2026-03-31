export  interface Famille {
    id: number;
    libelleFamille: string;
    descFamille: string;
    codeFamille: string;
    famille: string;
    estService:boolean;
    setFieldValue: (field: string, value: any) => void;
  }