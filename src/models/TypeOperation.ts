export interface TypeOperation {
    id: number
    libelle: string
    nature: string
    setFieldValue: (field: string, value: any) => void;
}