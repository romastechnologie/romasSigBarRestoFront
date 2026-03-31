
export interface JournalOperation {
    id: number;
    entityId: string;
    entityName: string;
    userId: string;
    action:string;
    adressMac:string;
    adressIP:string;
    createdAt?: string;
    setFieldValue: (field: string, value: any) => void;
}