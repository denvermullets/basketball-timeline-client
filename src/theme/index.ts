import { extendTheme, theme as base, ThemeConfig } from "@chakra-ui/react";
import { globalStyles } from "./styles";
import { momentText } from "./components/text";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const customTheme = extendTheme({
  config,
  fonts: {
    heading: `Montserrat, ${base.fonts?.heading}`,
    body: `Inter, ${base.fonts?.body}`,
  },
  components: {
    Text: {
      ...momentText,
    },
  },
  ...globalStyles,
});

export default customTheme;
