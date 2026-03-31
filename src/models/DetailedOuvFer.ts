import { Caisse } from "./Caisse";
import { User } from "./users";

export interface DetailedOuvFerm {
  id: number;
  caisse: Caisse;
  dateOuverture: string;
  fondsRoulement: number;
  personnesPresentes: User[];
  personnesPresentesFermeture:User[];
  observations: string;
  observationsFin:string;
  dateFin: string | null;
  solde: number;
  stockTheorique: number;
  ecart: number;
  status: string;
 setFieldValue: (field: string, value: any) => void;

}