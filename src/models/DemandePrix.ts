export interface DemandePrix {
  id: number;
  dateDdp: Date;
  estSup: boolean;
  estTransformer: boolean;
  nomProd?: string;
  setFieldValue: (field: string, value: any) => void;
}

export interface ConditionnementDepot {
  conditionnement: string;
  quantite: number;
  prixMin: number;
  prixVente: number;
  prixMax: number;
}

export interface ProduitDepot {
  produit: string;
  qtite: number;
  montant: number;
  prix: number;
  prixMax: number;
}
