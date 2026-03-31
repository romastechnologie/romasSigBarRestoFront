export interface Vente {
  id: number;
  montantHT: number;
  montantHTRSE: number;
  montantTVA: number;
  montantTS: number;
  montantAIB: number;
  montantTTC: number;
  dateCommande: string;
  typeCommande: string;
  typeFacture: string;
  tauxAIB: string | number;
  montantRecu?: number;
  clientId: number | string;
  societeId: number;
  setFieldValue: (field: string, value: any) => void;
}