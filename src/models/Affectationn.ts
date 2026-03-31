import { Caisse } from "./Caisse";
import { User } from "./users";

export interface Affectationn {
  id: number;
  user: User;
  caisse: Caisse;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}