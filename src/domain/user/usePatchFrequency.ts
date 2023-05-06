import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FrequencyQueryKeys, IPatchFrequencyPayload } from "./types";
import useApi from "../../service/api";

const usePatchFrequency = () => {
  const cache = useQueryClient();
  const api = useApi();
  return useMutation((payload: IPatchFrequencyPayload): any => {
    api.patch("/users/students/history", payload),
    {
      onSuccess: () => {
        cache.invalidateQueries([FrequencyQueryKeys.FREQUENCIES]);
      },
    };
  });
};

export default usePatchFrequency;
