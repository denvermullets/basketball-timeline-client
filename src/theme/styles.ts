import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
  colors: {
    darkMode: {
      50: "#f7f7f9",
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        overflowX: "hidden",
        bg: mode("pinkMoment.500", "darkMode.500")(props),
        letterSpacing: "-0.5px",
      },
      input: {
        color: "gray.700",
      },
    }),
  },
};
