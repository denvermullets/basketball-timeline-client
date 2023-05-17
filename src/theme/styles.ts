import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
  colors: {
    ATL: {
      50: "#C8102E",
      100: "#ffffff",
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        overflowX: "hidden",
        // bg: mode("darkMode.50", "darkMode.500")(props),
        letterSpacing: "-0.5px",
      },
    }),
  },
};
