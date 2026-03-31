import { Affectation } from "./Affectation";

export interface Caisse {
    statut: number;
    id: string;
    code:string;
    dateOuverture: Date;
    nom:string;
    agenceId: number; 
    userIds: number; 
    operationIds: number[]; 
    ouvertureFermetureIds: number[]; 
    affectations?: Affectation[];
    createdAt: string
    updatedAt: string
    deletedAt: string
    setFieldValue: (field: string, value: any) => void;

}