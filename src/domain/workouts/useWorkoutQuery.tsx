import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useToast } from "native-base";

import useApi from "../../service/api";
import { IWorkout } from "./types";

const useWorkoutQuery = () => {
  const toast = useToast();
  const api = useApi();
  return useQuery(
    ["workouts"],
    async () => {
      const response: AxiosResponse<IWorkout[]> = await api.get(
        "/workouts/student"
      );
      const { data } = response;
      return data.sort((a, b) => (a.isActive < b.isActive ? 1 : -1));
    },
    {
      onError: (error: any) => {
        toast.show({ description: error.message });
      },
    }
  );
};

export default useWorkoutQuery;
