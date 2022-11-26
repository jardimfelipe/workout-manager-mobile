export enum RolesEnum {
  TEACHER = "teacher",
  ADMIN = "admin",
  STUDENT = "student",
}

export interface IUser {
  name: string;
  age: number;
  email: string;
  role: RolesEnum;
  _id: string;
}

export type LoginPayload = {
  email: string;
  password: string;
};

export interface IToken {
  _id: string;
  email: string;
}
