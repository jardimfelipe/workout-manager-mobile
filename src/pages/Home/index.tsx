import React from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  Button,
  Center,
  Spinner,
  HStack,
  Pressable,
} from "native-base";

import { Card } from "../../components";
import useWorkoutQuery from "../../domain/workouts/useWorkoutQuery";
import { TouchableHighlight, TouchableOpacity, View } from "react-native";
import { IWorkout } from "../../domain/workouts/types";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = ({ navigation }) => {
  const { data, isLoading, refetch } = useWorkoutQuery();

  const handleCardPress = (workout: IWorkout) => {
    navigation.navigate("WorkoutExercises", { workout });
  };
  return (
    <SafeAreaView
    // refreshControl={
    //   <RefreshControl refreshing={isLoading} onRefresh={refetch} />
    // }
    >
      <Box safeArea={6}>
        {isLoading ? (
          <Center flexGrow="1" h="full">
            <Spinner size="lg" />
          </Center>
        ) : (
          <VStack space="md">
            {data?.map((workout) => (
              <Card
                onPress={() => handleCardPress(workout)}
                bg={workout.isActive ? "primary.600" : "white"}
                pressedBg={workout.isActive ? "primary.700" : "gray.100"}
                key={workout._id}
                py="5"
                px="8"
              >
                <VStack space="md">
                  <Heading color={workout.isActive ? "white" : "black"}>
                    {workout.name}
                  </Heading>
                  <HStack space={3}>
                    <Text color={workout.isActive ? "white" : "black"} bold>
                      Modulos:{" "}
                    </Text>
                    <HStack space={1}>
                      {workout.training.map((training) => (
                        <Text
                          color={workout.isActive ? "white" : "black"}
                          key={training.name}
                        >
                          {training.name}
                        </Text>
                      ))}
                    </HStack>
                  </HStack>
                </VStack>
              </Card>
            ))}
          </VStack>
        )}
      </Box>
    </SafeAreaView>
  );
};

export default Home;
