// export  interface Approvisionnement {
//     id: number;
//     photo: string;
//     nomMedia: string;
//     typeMedia: string;
//     extension: string;
//     idTable: number;
//     nomTable: string;
//     prixRevient:number;
//     setFieldValue: (field: string, value: any) => void;
//   }

export interface ApprovisionnementDepot {
    approvisionnement:string,
    prix: number,
    qtite: number,
    montant: number,
}

export interface Aprocondimagasin {
  id?: number;
  qteCondAppro?: number;
  prixRevient?: number;
  montantCond?: number;
  magasin?: {
    id?: number;
    nomMagasin?: string;
  };
}

export interface Apropocondi {
  id?: number;
  qtite?: number;
  prixRevient?: number;
  montant?: number;
  produitcondi?: {
    id?: number;
    nomProCond?: string;
    conditionnement?: {
      id?: number;
      libelle?: string;
    };
  };
  aprocondimagasins?: Aprocondimagasin[];
  totalCalculé?: number; // Optionnel pour le calcul en frontend
}

export interface Approvisionnement {
  id: number;
  refAppro: string;
  dateAppro: string | Date;
  montantTotal: number;
  montantHT?: number;
  montantTVA?: number;
  fournisseur?: {
    id?: number;
    nomFournisseur?: string;
    contact?: string;
    adresse?: string;
  };
  refApproGen: string;
  apropocondis?: Apropocondi[]; // Ajoutez cette ligne
  statut?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  setFieldValue: (field: string, value: any) => void;
}
