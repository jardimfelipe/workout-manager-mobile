import React from "react";

import { IconButton, IIconButtonProps } from "native-base";

type Props = {
  icon: IIconButtonProps["_icon"];
  onPress: () => void;
};

const SearchBarHeader = ({ icon, onPress }: Props) => {
  return (
    <IconButton
      borderRadius="full"
      variant="ghost"
      name="search"
      onPress={onPress}
      _hover={{
        bg: "black:alpha.20",
      }}
      _pressed={{
        bg: "black:alpha.20",
      }}
      _icon={icon}
    />
  );
};

export default SearchBarHeader;
