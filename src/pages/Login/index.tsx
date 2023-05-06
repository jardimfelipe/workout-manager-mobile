import axios, { AxiosError } from "axios";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  KeyboardAvoidingView,
  Text,
  VStack,
} from "native-base";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Card } from "../../components";
import { LoginPayload } from "../../domain/auth/types";
import useLogin from "../../domain/auth/useLogin";

const Login = () => {
  const mutation = useLogin();
  const passwordInput = useRef<HTMLInputElement>(null);
  const [authError, setAuthError] = useState("");
  const { control, handleSubmit, formState } = useForm<LoginPayload>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginPayload) => {
    setAuthError("");
    mutation.mutate(data, {
      onError: (error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          setAuthError(error.response.data.message);
        } else {
          setAuthError("Ocorreu um erro, tente novamente mais tarde");
        }
      },
    });
  };
  return (
    <Box flex="1" justifyContent="center" safeAreaX={6}>
      <KeyboardAvoidingView>
        <Card p="7">
          <VStack space={6}>
            <Center>
              <Heading>Login</Heading>
            </Center>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Campo obrigatório",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Email inválido",
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    onBlur={onBlur}
                    isInvalid={!!formState.errors.email?.message}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    value={value}
                    isDisabled={mutation.isLoading}
                    onSubmitEditing={() => passwordInput.current.focus()}
                    blurOnSubmit={false}
                    returnKeyType="next"
                  />
                  {formState.errors.email?.message && (
                    <Text color="red.500">
                      {formState.errors.email?.message}
                    </Text>
                  )}
                </>
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{ required: "Campo obrigatorio" }}
              render={({ field: { value, onChange, onBlur } }) => (
                <>
                  <FormControl.Label>Senha</FormControl.Label>
                  <Input
                    value={value}
                    onBlur={onBlur}
                    isInvalid={!!formState.errors.password?.message}
                    onChangeText={onChange}
                    isDisabled={mutation.isLoading}
                    onSubmitEditing={handleSubmit(onSubmit)}
                    ref={passwordInput}
                    returnKeyType="send"
                    type="password"
                  />
                  {formState.errors.password?.message && (
                    <Text color="red.500">
                      {formState.errors.password?.message}
                    </Text>
                  )}
                </>
              )}
            />

            <Button
              isLoading={mutation.isLoading}
              isDisabled={!formState.isValid}
              onPress={handleSubmit(onSubmit)}
              mt="2"
              color="primary.500"
            >
              Entrar
            </Button>
            {authError && (
              <Center>
                <Text color="red.500">{authError}</Text>
              </Center>
            )}
          </VStack>
        </Card>
      </KeyboardAvoidingView>
    </Box>
  );
};

export default Login;
