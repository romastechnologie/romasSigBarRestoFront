export  interface Detachement {
    id: number;
    dateDetachement: Date;

    setFieldValue: (field: string, value: any) => void;
  }