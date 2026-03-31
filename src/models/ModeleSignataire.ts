export  interface ModeleSignataire {
    id: number;
    photo: string;
    nomMedia: string;
    typeMedia: string;
    extension: string;
    idTable: number;
    nomTable: string;
    setFieldValue: (field: string, value: any) => void;
  }

  export interface ModeleSignataireDepot {
    produit:string,
    prix: number,
    qtite: number,
    montant: number,
}