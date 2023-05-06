import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { Box } from "native-base";

import { formatToDisplay, useConfirm } from "../../utils";

const TODAY = new Date().toISOString().split("T")[0];

LocaleConfig.locales['br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};

LocaleConfig.defaultLocale = 'br';

const Frequency = () => {
  const { confirm, handleClose, ConfirmModalComponent } = useConfirm();

  const handleDayPress = (date: DateData) => {
    confirm({
      title: 'Marcar presença',
      content: `Tem certeja que deseja marcar presença no dia ${formatToDisplay(new Date(date.dateString))}`,
      onOk() {
        console.log('OK');
        handleClose()
      },
      onCancel() {
        console.log('Cancel');
        handleClose()
      },
    });
  };
  return (
    <SafeAreaView>
      <Box safeArea={6}>
        <Calendar maxDate={TODAY} onDayPress={handleDayPress} />
        {ConfirmModalComponent}
      </Box>
    </SafeAreaView>
  );
};

export default Frequency;
