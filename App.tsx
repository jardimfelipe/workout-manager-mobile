import React, { useEffect, useState } from "react";

import { NavigationContainer, useTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Center, Icon, NativeBaseProvider, Spinner, Text } from "native-base";

import { AuthContext, DEFAULT_AUTH_VALUES } from "./src/context";
import { getValueInStore } from "./src/utils";
import Home from "./src/pages/Home";
import Login from "./src/pages/Login";
import Profile from "./src/pages/Profile";
import WorkoutExercises from "./src/pages/WorkoutExercises";
import jwtDecode from "jwt-decode";
import { HeaderButton } from "./src/components/";
import theme from "./theme";
import Frequency from "./src/pages/Frequency";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

export default function App() {
  const [authState, setAuthState] = useState(DEFAULT_AUTH_VALUES.authState);

  useEffect(() => {
    (async () => {
      setAuthState({
        ...authState,
        isTokenLoading: true,
      });
      const accessToken = await getValueInStore("accessToken");
      const refreshToken = await getValueInStore("refreshToken");
      setAuthState({
        ...authState,
        isTokenLoading: false,
        refreshToken,
        accessToken,
        isLoggedIn: !!refreshToken,
        user: accessToken ? jwtDecode(accessToken) : undefined,
      });
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <NativeBaseProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            {authState.isTokenLoading ? (
              <Center flexGrow="1" h="full">
                <Spinner size="lg" />
              </Center>
            ) : (
              <Stack.Navigator>
                {authState.isLoggedIn ? (
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="authenticated"
                    component={Tabs}
                  />
                ) : (
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="login"
                    component={Login}
                  />
                )}
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </QueryClientProvider>
      </NativeBaseProvider>
    </AuthContext.Provider>
  );
}

const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShadowVisible: false,
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      options={{
        headerShown: false,
      }}
      component={Home}
    />
    <HomeStack.Screen
      name="WorkoutExercises"
      options={({ navigation, route }) => ({
        headerLeft: () => (
          <HeaderButton
            onPress={() => navigation.goBack()}
            icon={{
              as: Ionicons,
              name: "chevron-back",
              color: "#000000",
            }}
          />
        ),
      })}
      component={WorkoutExercises}
    />
  </HomeStack.Navigator>
);

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarStyle: { paddingBottom: 5 } }}>
      <Tab.Screen
        name="Workouts"
        component={HomeStackScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text bold={focused} color={focused ? "primary.600" : "black"}>
              Meus Treinos
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Icon
              as={Ionicons}
              name="newspaper-outline"
              color={focused ? "primary.600" : "black"}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text bold={focused} color={focused ? "primary.600" : "black"}>
              Frequência
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Icon
              as={Feather}
              name="calendar"
              color={focused ? "primary.600" : "black"}
            />
          ),
        }}
        name="Frequência"
        component={Frequency}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text bold={focused} color={focused ? "primary.600" : "black"}>
              Meu Perfil
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Icon
              as={Feather}
              name="user"
              color={focused ? "primary.600" : "black"}
            />
          ),
        }}
        name="Meu Perfil"
        component={Profile}
      />
    </Tab.Navigator>
  );
};
