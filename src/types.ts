export interface loginUserType {
  email: string;
  password: string;
}

export interface validUserType {
  name: string;
  mobile_no: number;
  email: string;
  password: string;
  emp_code: number;
}
export interface dbUserType {
  name: string;
  mobile_no: number;
  email: string;
  password: string;
  emp_code: number;
  _doc: Object;
}
