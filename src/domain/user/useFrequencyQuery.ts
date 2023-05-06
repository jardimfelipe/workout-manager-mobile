import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useToast } from "native-base";

import useApi from "../../service/api";
import { FrequencyQueryKeys } from "./types";

const useWorkoutQuery = () => {
  const toast = useToast();
  const api = useApi();
  return useQuery(
    [FrequencyQueryKeys.FREQUENCIES],
    async () => {
      const response: AxiosResponse<Date[]> = await api.get(
        "/workouts/student"
      );
      return response.data;
    },
    {
      onError: (error: any) => {
        toast.show({ description: error.message });
      },
    }
  );
};

export default useWorkoutQuery;
