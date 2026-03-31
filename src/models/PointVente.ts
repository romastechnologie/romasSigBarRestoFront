export  interface PointVente {
    id: number;
    photo: string;
    nomMedia: string;
    typeMedia: string;
    extension: string;
    idTable: number;
    nomTable: string;
    setFieldValue: (field: string, value: any) => void;
  }