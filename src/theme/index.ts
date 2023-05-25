import { extendTheme, theme as base } from "@chakra-ui/react";
import { globalStyles } from "./styles";
import { momentText } from "./components/text";

const customTheme = extendTheme({
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
