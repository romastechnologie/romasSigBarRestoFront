
export interface OuvFerObject {
  code: number;
  message: string;
  data: OuvFer[];
}

export interface Tresorerie {
  id: number;
  nom: string;
  status: string; // Add other fields if necessary
}

export interface OuvFer {
  id: number;
  fondDeRoulement: string;
  chiffreaffaire: string;
  tresorerieName: number;
  ouvFerName: number;
  tresorerieId: number;
  tresorerie: Tresorerie; // Include the nested object
  tresoreriestatus: string;
  status:string;
  ouvFerId: number;
  userId: number;
  setFieldValue: (field: string, value: any) => void;
}



