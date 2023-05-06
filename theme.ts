import { extendTheme } from "native-base";

export default extendTheme({
  colors: {
    // Add new color
    primary: {
      50: "#a2c2ca",
      100: "#8fb5bf",
      200: "#7ca9b4",
      300: "#57909f",
      400: "#448494",
      500: "#0088CC",
      600: "#3d7785",
      700: "#366a76",
      800: "#305c68",
      900: "#294f59",
    },
    fontConfig: {
      Poppins: {
        100: {
          normal: "Poppins-Light",
          italic: "Poppins-LightItalic",
        },
        200: {
          normal: "Poppins-Light",
          italic: "Poppins-LightItalic",
        },
        300: {
          normal: "Poppins-Light",
          italic: "Poppins-LightItalic",
        },
        400: {
          normal: "Poppins-Regular",
          italic: "Poppins-Italic",
        },
        500: {
          normal: "Poppins-Medium",
        },
        600: {
          normal: "Poppins-Medium",
          italic: "Poppins-MediumItalic",
        },
        700: {
          normal: "Poppins-Bold",
        },
        800: {
          normal: "Poppins-Bold",
          italic: "Poppins-BoldItalic",
        },
        900: {
          normal: "Poppins-Bold",
          italic: "Poppins-BoldItalic",
        },
      },
    },
    components: {
      Text: {
        baseStyle: {
          color: "black",
        },
      },
    },

    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
      heading: "Poppins",
      body: "Poppins",
      mono: "Poppins",
    },
    secondary: {},
  },
});
