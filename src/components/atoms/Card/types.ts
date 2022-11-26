import { InterfaceBoxProps } from "native-base/lib/typescript/components/primitives/Box";

export interface CardProps extends InterfaceBoxProps {
  onPress?: () => void;
  disabledPress?: boolean;
  pressedBg?: InterfaceBoxProps["bg"];
}
