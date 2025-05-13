import React from "react";
import { ImageProps, Image as RNImage } from "react-native";
import { useStyles } from "react-native-unistyles";
import { lightTheme } from "../../styles/themes";

const ImageContainer: React.FC<ImageProps> = ({ ...rest }) => {
  const { theme } = useStyles();
  return <RNImage tintColor={lightTheme.colors.black} {...rest} />;
};
export default ImageContainer;
