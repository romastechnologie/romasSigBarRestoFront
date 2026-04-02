export  interface Met {
    id: number;
    codeProduit:string|null;
    libelleFamille: string;
    nomProd:string;
    refProd:string;
    codeFamille: string;
    imagePrincipal:string;
    estPublier:boolean;
    famille: number;
    uniteGestion: number;
    uniteStock: number;
    uniteVente: number
    domaines: [];
    setFieldValue: (field: string, value: any) => void;
  }

  export interface ConditionnementDepot {
    conditionnement:string,
    quantite: number,
    prixMin: number,
    prixVente: number,
    prixMax: number,
}

export interface ProduitDepot {
  produit:string,
  qtite: number,
  montant: number,
  prixRevient:number,
  prix: number,
  prixMax: number,
  qtitePhysique: number,
  qtiteLogique: number,
  ecart: number,
  prixUnitaire:number,
}

export interface ProduitSelect {
  commande_clit_id:string,
  magasin:string,
  produit: string,
  qtite: number,
  prixTtc: number,
  prixHt: number,
  prixInitial: number;
  taxeSpecifique: number,
  typeRemise: string,
  valeurRemise: number,
  montantHt: number,
  montantTva: number,
  montantTtc: number,
  montantTs:number,
  montantHtApresRemise: number,
  libelleProduit:string,
  groupeTaxeProduit:string,
  carton: number,
  piece: number,
  stock: number,
  remise: number,
  restAliv: number,
  taxe:number
}

        
