import { Tresorerie } from "./Tresorerie";

export interface TransfertObject {
    code: number;
    message: string;
    data: Transfert[];
}

// export interface Transfert {
//     id?: number
//     source?: string
//     destination?: string
//     montant?: number
//     tresorerie?: Tresorerie
//     tresorerie2?: Tresorerie
//     created_at?: Date;
//     dateDeTransfert: Date;
//     setFieldValue?: (field: string, value: any) => void;
  
// }


export interface Transfert {
    id?: number
    magasin:number,
    montant?: number,
    motif:string,
    prixUnitaire:number,
    created_at?: Date;
    dateDeTransfert: Date;
    setFieldValue?: (field: string, value: any) => void;
  
}