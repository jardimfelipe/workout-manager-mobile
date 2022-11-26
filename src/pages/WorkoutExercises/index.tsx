import React, { useEffect, useMemo, useState } from "react";

import { Box, Text } from "native-base";
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import { Pressable, useWindowDimensions } from "react-native";

import { IWorkout } from "../../domain/workouts/types";
import { TraningCardList } from "../../components";

type Route = {
  key: string;
  title: string;
};

type State = NavigationState<Route>;

const WorkoutExercises = ({ navigation, route }) => {
  const { workout } = route.params as { workout: IWorkout };
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  const layout = useWindowDimensions();

  useEffect(() => {
    navigation.setOptions({ title: workout.name });
  }, [workout]);

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: State }
  ) => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const borderColor = index === i ? "red.700" : "transparent";
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="4"
              bg="white"
              key={`tab-${i}`}
            >
              <Pressable
                onPress={() => {
                  setIndex(i);
                }}
              >
                <Text bold={index === i}>{route.title}</Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  const sceneObject = useMemo(() => {
    const sceneObject = workout?.training.reduce((acc, curr) => {
      acc[curr.name] = () => (
        <Box safeArea={4}>
          <TraningCardList exercises={curr.exercises} />
        </Box>
      );
      return acc;
    }, {});
    return sceneObject;
  }, [route]);

  const renderScene = SceneMap(sceneObject);

  useEffect(() => {
    if (!workout) return;
    const routes = workout.training?.map((training) => ({
      key: training.name,
      title: `Treino ${training.name}`,
    }));
    setRoutes(routes);
  }, [route]);

  return workout ? (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  ) : null;
};

export default WorkoutExercises;
