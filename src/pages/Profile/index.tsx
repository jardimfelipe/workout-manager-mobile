import React from "react";

import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  VStack,
  Input,
  FormControl,
  ScrollView,
} from "native-base";
import { useForm } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";

import useLogout from "../../domain/auth/useLogout";
import { useAuthContext } from "../../context";
import { Card } from "../../components";
import { BodyMeaseurements } from "../../domain/auth/types";

const Profile = () => {
  const { authState } = useAuthContext();
  const logout = useLogout();
  const { control, handleSubmit, formState } = useForm<any>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <ScrollView>
      <Box safeArea={4}>
        <VStack space={4}>
          <Center>
            <Icon
              color="gray.300"
              size={100}
              as={FontAwesome}
              name="user-circle-o"
            />
            <Heading bold>{authState.user.name}</Heading>
          </Center>

          <Card py="5" px="8">
            <VStack space={4}>
              {Object.keys(authState.user.bodyMeasurements).map((key, index) =>
                key !== "_id" ? (
                  <VStack key={`body-${index}`}>
                    <FormControl.Label>
                      {BodyMeaseurements[key]}
                    </FormControl.Label>
                    <Input
                      value={`${authState.user.bodyMeasurements[
                        key
                      ].toString()} cm`}
                    />
                  </VStack>
                ) : null
              )}
            </VStack>
          </Card>

          <Button colorScheme="red" onPress={() => logout.mutate()}>
            Sair
          </Button>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default Profile;
