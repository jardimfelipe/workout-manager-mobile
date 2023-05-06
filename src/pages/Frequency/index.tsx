import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar, DateData } from "react-native-calendars";
import { Box } from "native-base";
import { confirmation } from "../../components";

const TODAY = new Date().toISOString().split("T")[0];

const Frequency = () => {
  const handleDayPress = ({ dateString }: DateData) => {
    confirmation({
      text: `Você treino dia ${dateString}?`,
      onConfirm: () => console.log("confirmado"),
    });
  };
  return (
    <SafeAreaView>
      <Box safeArea={6}>
        <Calendar maxDate={TODAY} onDayPress={handleDayPress} />
      </Box>
    </SafeAreaView>
  );
};

export default Frequency;
