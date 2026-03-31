export interface OuvFerm {
    id?: number;
    pointCaisse?: number;
    caisseId: number;
    caisse?: { id: number; nom: string };
    dateOuverture: string;
    solde: number;
    fondsRoulement: number;
    dateFin?: string | null;
    ecart?: number | null;
    status: string;
    userIds: number[];
    userCreationId: number;
    isRegularized?: boolean;
    rapportPath?: string | null;
    reliquatTotalRetourner:number
    // caisseId: string;
    createdAt?: string;
    // setFieldValue: (field: string, value: any) => void;
    // updatedAt: string
    // deletedAt: string
}

// interface Ouv_Fer {
//   id?: number;
//   caisseId: number;
//   fondDeRoulement: number;
//   solde: number;
//   dateOuverture: string;
//   dateFin?: string | null;
//   ecart?: number | null;
//   status: string;
//   userIds: number[];
//   userCreationId: number;
// }
