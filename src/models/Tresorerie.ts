export interface TresorerieObject {
    code: number;
    message: string;
    data: Tresorerie[];
}

export interface Tresorerie {
    id?: number
    nom?: string
    montant?: number
    status?: string
    operation?: string   
    dateCreation?: string
    created_at?: Date;
    typeTresorerieId?: string
    setFieldValue?: (field: string, value: any) => void;
}