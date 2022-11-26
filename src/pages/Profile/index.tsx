import React from "react";

import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  VStack,
  Text,
  Card,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";

import useLogout from "../../domain/auth/useLogout";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../context";

const Profile = () => {
  const { authState } = useAuthContext();
  const logout = useLogout();

  return (
    <SafeAreaView>
      <Box safeArea={4}>
        <Center>
          <VStack space={4}>
            <Center>
              <Icon
                color="gray.300"
                size={100}
                as={FontAwesome}
                name="user-circle-o"
              />
            </Center>
            <Heading bold>{authState.user.name}</Heading>

            <Button colorScheme="red" onPress={() => logout.mutate()}>
              Sair
            </Button>
          </VStack>
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default Profile;
