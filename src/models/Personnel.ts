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
    urlImage:string;
    civilite:string;
    dateNais:Date;
    dateEmbauche:Date;
    numeroSecuriteSociale:number,
    nationalite:string;
    religions:string;
    ethnies:string;
    services:string;
    fonction:string;
    dateDebut:Date;
    dateFin:Date;
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
    nomConjoint:string;
    prenomConjoint:string; 
    birthdateConjoint:Date;
    nationaliteConjoint:string;
    telephoneConjoint:string; 
    passeportConjoint:string; 
    religionConjoint:string; 
    ethnieConjoint:string;
    nombreEnfant:number;
    taille:string;
    poids:string;
    groupeSanguin:string; 
    visionGauche:string; 
    visionDroite:string;
    auditionGauche:string;
    auditionDroite:string;
    mainGauche:string; 
    mainDroite:string;
    jambeGauche:string;
    jambeDroite:string;
    banque:string;
    numeroCompte:string;
    codeIban:string;
    codeSwift:string;
    nomContact:string;
    telephoneContact:string;
    relationContact:string;



    setFieldValue: (field: string, value: any) => void;
  }