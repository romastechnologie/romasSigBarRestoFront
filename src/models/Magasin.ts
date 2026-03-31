export  interface Magasin {
    id: number;
    photo: string;
    nomMagasin: string;
    code: string;
    adresse: string;
    estPrincipal: boolean;
    idTable: number;
    nomTable: string;
    sections: Magasin[]
    user?: {
        nom: string;
        prenom: string;
    };
    setFieldValue: (field: string, value: any) => void;
  }

  export interface MagasinDepot {
    magasin:string,
    prix: number,
    qtite: number,
    montant: number,
}