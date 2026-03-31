export interface Client {
  id: number;
  nomClient: string;
  prenomClient: string;
  // ... autres propriétés éventuelles
}

export interface CategorieClient {
  id: number;
  libelle: string;
  // ... autres propriétés éventuelles
}

export interface Affectation {
  id: number;
  clientId: number;
  categorieClientId: number;
  client?: Client; // relation optionnelle
  categorieClient?: CategorieClient; // relation optionnelle
}
