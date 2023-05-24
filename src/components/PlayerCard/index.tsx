import { Avatar, Box, Flex, Heading, useBreakpointValue } from "@chakra-ui/react";

type PlayerCardProps = {
  headshot: string;
  name: string;
  color: string;
};

const PlayerCard: React.FC<PlayerCardProps> = ({ headshot, name, color }) => {
  // splitting first / last name to be on 2 lines
  const firstSpaceIndex = name.indexOf(" ");
  const firstName = firstSpaceIndex !== -1 ? name.slice(0, firstSpaceIndex) : name;
  const lastName = firstSpaceIndex !== -1 ? name.slice(firstSpaceIndex + 1) : "";
  const longLastName = lastName.length > 12;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const headingSize = () => {
    if (longLastName && isMobile) {
      return "xs";
    } else if (longLastName) {
      return "sm";
    } else {
      return "md";
    }
  };

  const headshotSize = () => {
    if (isMobile && !headshot) {
      return 0;
    } else if (!headshot) {
      return 45;
    } else {
      return 0;
    }
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      padding={isMobile ? 0 : 8}
      position="relative"
      rounded="md"
      shadow={{ md: "base" }}
      borderWidth={1}
      borderColor={`${color}.50`}
      backgroundColor="white"
    >
      <Box
        position="absolute"
        bottom="0"
        width="100%"
        height="2"
        bgGradient={`linear(40deg, ${color}.50, ${color}.100)`}
        roundedBottom="inherit"
      />

      <Avatar
        size={isMobile ? "xl" : "3xl"}
        src={headshot}
        borderRadius="5px"
        marginBottom={headshotSize()}
      />
      <Box textAlign="center">
        <Heading
          as="h2"
          size={headingSize()}
          lineHeight={isMobile ? 3 : 6}
          fontSize={isMobile ? "12px" : "18px"}
          marginTop={isMobile ? "6px" : "8px"}
          marginBottom={isMobile ? "16px" : 0}
        >
          {firstName}
          <br />
          <Box> {isMobile ? lastName.replace("-", "- ") : lastName}</Box>
        </Heading>
      </Box>
    </Flex>
  );
};

export default PlayerCard;
