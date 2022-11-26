import * as SecureStore from "expo-secure-store";

export const saveInStore = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const removeValue = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

export const getValueInStore = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};
