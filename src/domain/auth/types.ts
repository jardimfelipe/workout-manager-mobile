import { IWorkout } from "../workouts/types";

export enum RolesEnum {
  TEACHER = "teacher",
  ADMIN = "admin",
  STUDENT = "student",
}

export interface IUser {
  name: string;
  age: number;
  email: string;
  refreshToken: string;
  password: string;
  role: RolesEnum;
  teacherId: string;
  trainingHistory?: Date[];
  bodyMeasurements?: IBodyMeasurements;
  workouts?: IWorkout[];
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

export interface IBodyMeasurements {
  shoulder: number;

  chest: number;

  weight: number;

  leftBiceps: number;

  righBiceps: number;

  leftForearm: number;

  righForearm: number;

  abd: number;

  leftThigh: number;

  righThigh: number;

  leftCalf: number;

  righCalf: number;
}

export enum BodyMeaseurements {
  shoulder = "Ombro",
  chest = "Peitoral",
  weight = "Peso",
  leftBiceps = "Bíceps Esquerdo",
  righBiceps = "Bíceps direito",
  leftForearm = "Antebraço esquerdo",
  righForearm = "Antebraço direito",
  abd = "Abdomen",
  leftThigh = "Coxa esquerda",
  righThigh = "Coxa direita",
  leftCalf = "Panturrilha esquerda",
  righCalf = "Panturrilha direita",
}
