export  interface FamilleProduitChampsLibres {
    id: number;
    statut: string;
    champslibre: string;
    famille: string;
    setFieldValue: (field: string, value: any) => void;
  }