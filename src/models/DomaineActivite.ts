export interface DomaineActivite {
    id: number
   code: string
    libelle: string
    setFieldValue: (field: string, value: any) => void;
}