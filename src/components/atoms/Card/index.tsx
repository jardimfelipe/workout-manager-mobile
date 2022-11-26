import { Box, Pressable } from "native-base";
import React from "react";
import { CardProps } from "./types";

const Card = ({
  bg = "white",
  pressedBg = "gray.100",
  rounded = "lg",
  shadow = "2",
  disabledPress = false,
  children,
  onPress,
  ...props
}: CardProps) => {
  return (
    <Pressable disabled={disabledPress} onPress={onPress}>
      {({ isPressed }) => (
        <Box
          rounded={rounded}
          shadow={shadow}
          bg={isPressed ? pressedBg : bg}
          {...props}
          width="100%"
        >
          {children}
        </Box>
      )}
    </Pressable>
  );
};

export default Card;
