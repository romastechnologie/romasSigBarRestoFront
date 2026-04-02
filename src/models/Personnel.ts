import { ProduitSelect } from "./Produit";

export  interface Personnel {
    id: number;
    photo: string;
    nomMedia: string;
    typeMedia: string;
    extension: string;
    idTable: number;
    nomTable: string;
    nom:string;
    prenom:string;
    situationMatrimoniale:string;
    sexe:string,
    photoEmploye:string;
    civilite:string;
    dateEmbauche:Date;
    numeroSecuriteSociale:number,
    nationalite:string;
    religions:string;
    ethnies:string;
    services:string;
    fonction:string;
    dateDebutFonc:Date;
    dateFinFonc:Date;
    personnel?:number; 
    birthdate:Date;
    bien?:number;
    religion:string;
    ethnie:string; 
    titreposte:string;
    boitePostale:number;
    telephone:string;
    telephone2:string;
    email:string;
    departement:string;
    commune:string;
    arrondissement:string;
    quartier:string; 
    adresse:string;
    nomContact:string;
    telephoneContact:string;
    relationContact:string;
 



    setFieldValue: (field: string, value: any) => void;
  }