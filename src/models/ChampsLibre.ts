export interface ChampsLibre {
    id?: number;
    typeChamp: string;
    nomChamp: string;
    libelleChamp: string;
    valeurParDefaut?: number;
    estObligatoire: number;
    modeSaisie?: string;
    valeurPossible?: any;
    idProChamp: number;
    valeur: any;
    setFieldValue?: (field: string, value: any) => void;
}