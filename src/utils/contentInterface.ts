export interface contentInterface {
  id: number;
  title: string;
  data: string;
  creationDate: Date;
  language: string;
  expiryDate: string;
}

export interface pastedData {
  title: string;
  data: string;
  creationDate: Date;
  language: string;
  expiryDate: string;
}

export interface editData {
  id: number;
  edit: string;
}
