export interface Facture {
    id: number;
    
    dateFac: Date;
    refFac: string;
    montantTotal: number;
    montantTotalCmd: number;
    montantRest: number;
    statut: string;
    
    estNormalisee: boolean;
    mecefCode: string;
    mecefQrCode?: string;
    mecefCompteur?: string;
    mecefNim?: string;
    mecef_date?: Date;
    
    typeFacture: string;  
        dateAnnulation?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    
    commande?: {
        id: number;
        refCom: string;
        client?: {
            id: number;
            nomClient: string;
            prenomClient: string;
            raisonSociale?: string;
        };
        typeCommande?: string;
    };
    
    user?: {
        id: number;
        nom: string;
        prenom: string;
    };
    
    photo?: string;
    nomMedia?: string;
    typeMedia?: string;
    extension?: string;
    idTable?: number;
    nomTable?: string;
    
    setFieldValue?: (field: string, value: any) => void;
}