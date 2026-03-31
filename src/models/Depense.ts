export  interface Depense {
    id: number;
    photo: string;
    nomMedia: string;
    typeMedia: string;
    extension: string;
    idTable: number;
    nomTable: string;
    observation:string;
    estValide: boolean;
    dateCreation: Date;
    dateModification: Date;
    personnelId:number;
    typedepenseId:number;
    entretienId:number; 
    categoriedepenseId:number;
    planificationId:number; 
    setFieldValue: (field: string, value: any) => void;
  }