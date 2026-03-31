
export interface JournalConnexion {
    id: number;
    entityId: string;
    userName: string;
    action:string;
    createdAt?: string;
    setFieldValue: (field: string, value: any) => void;
}