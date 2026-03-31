export  interface Banque {
    id: number;
    sigle:string;
    denomination:string;
    codeSwift:string;
    codeBanque:string; 
    identification:string;
    photo: string;
    nomMedia: string;
    typeMedia: string;
    extension: string;
    idTable: number;
    nomTable: string;
    setFieldValue: (field: string, value: any) => void;
  }