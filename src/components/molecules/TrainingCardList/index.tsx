import React from "react";

import {
  Center,
  Divider,
  FlatList,
  HStack,
  Text,
  View,
  VStack,
} from "native-base";

import Card from "../../atoms/Card";
import { IExercise } from "../../../domain/workouts/types";

type Props = {
  exercises: IExercise[];
};

const TraningCardList = ({ exercises }: Props) => {
  return (
    <FlatList
      data={exercises}
      keyExtractor={(item, index) =>
        `${item.exercise}-${Math.random()}-${index}`
      }
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item }) => (
        <Card disabledPress shadow="0">
          <VStack>
            <Card disabledPress rounded="none" roundedTop="lg" p="5" shadow="0">
              <Center>
                <HStack space="xl">
                  <Text color="black" fontSize="lg" bold>
                    {item.exercise}
                  </Text>
                  <Text fontSize="lg" bold>
                    -
                  </Text>
                  <Text fontSize="lg">{item.method}</Text>
                </HStack>
              </Center>
            </Card>
            <Card
              disabledPress
              rounded="none"
              roundedBottom="lg"
              p="5"
              bg="primary.700"
              shadow="0"
            >
              <Center>
                <HStack space="lg">
                  <Text fontSize="xl" color="white">
                    {item.series.split("x")[0]} séries
                  </Text>
                  <Divider color="amber.200" orientation="vertical" />
                  <Text fontSize="xl" color="white">
                    {item.series.split("x")[1]} reps
                  </Text>
                </HStack>
              </Center>
            </Card>
          </VStack>
        </Card>
      )}
    />
  );
};

export default TraningCardList;
