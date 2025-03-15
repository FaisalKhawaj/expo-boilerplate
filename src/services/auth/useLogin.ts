import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginCredentials, User } from "./types";
import { login } from "../api/login";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, LoginCredentials>({
    mutationFn: login,
    onSuccess: () => {
      //   queryClient.invalidateQueries({ queryKey: ["challenges", "enrolled"] });
      //   queryClient.invalidateQueries({ queryKey: ["weeklyOverview"] });
    },
  });
};
