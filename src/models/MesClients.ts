export interface User {
  id: string | number; // Ajustez selon le type réel de l'ID
  nom: string;
  prenom: string;
  // Ajoutez d'autres propriétés si nécessaire
}

export interface Client {
  nomClient: string;
  prenomClient: string;
  raisonSociale: string;
  // Ajoutez d'autres propriétés si nécessaire
}

export interface MesClients {
  id: string | number; // Ajustez selon le type réel de l'ID
  client: Client;
  user: User; // user doit être un objet, pas une string
}