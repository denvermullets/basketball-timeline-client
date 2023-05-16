import { mode, StyleConfig, StyleFunctionProps } from "@chakra-ui/theme-tools";

export const momentText: StyleConfig = {
  baseStyle: (props: StyleFunctionProps) => ({
    color: mode("purpleMoment.800", "darkMode.200")(props),
  }),

  variants: {
    navLinks: (props: StyleFunctionProps) => ({
      color: mode("purpleMoment.900", "darkMode.100")(props),
      marginLeft: "5px",
      fontWeight: "800",
    }),
    navHeader: (props: StyleFunctionProps) => ({
      color: mode("purpleMoment.800", "darkMode.200")(props),
      fontWeight: "900",
      fontSize: "34px",
      _focus: { boxShadow: "none" },
    }),
  },
};
