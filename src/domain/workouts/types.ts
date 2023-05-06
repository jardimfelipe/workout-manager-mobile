import { IUser } from "../auth/types";

export interface IExercise {
  method: string;
  series: string;
  exercise: string;
}

export interface ITraining {
  name: string;
  exercises: IExercise[];
}

export interface IWorkout {
  _id: string;
  name: string;
  training: ITraining[];
  student: IUser;
  isActive: boolean;
  createdBy: IUser;
}

export enum WorkoutQueryKeys {
  WORKOUTS = "workouts",
}
