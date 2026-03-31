export  interface Equipe {
    id: number;
    role: string;
    nomComplet: string;
    personnel:string;
    setFieldValue: (field: string, value: any) => void;
  }