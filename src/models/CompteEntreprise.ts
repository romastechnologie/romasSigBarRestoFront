export interface CompteEntreprise {
  id: number;
  numero: number;
  intituleCompte: string;
  soldeInitial: number;
  estActif: boolean;
  estSup: boolean;
  typeCompte: number;
  statut: boolean;
  soldeActuel: number;
  setFieldValue: (field: string, value: any) => void;
}