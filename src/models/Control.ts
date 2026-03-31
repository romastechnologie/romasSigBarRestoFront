export  interface Control {
    id: number;
    date:Date
    observation: string;
    setFieldValue: (field: string, value: any) => void;
  }