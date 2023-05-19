import { Avatar, Box, Flex, HStack, Heading, VStack } from "@chakra-ui/react";

type PlayerCardProps = {
  headshot: string;
  name: string;
  color: string;
};

const PlayerCard: React.FC<PlayerCardProps> = ({ headshot, name, color }) => {
  // splitting first / last name to be on 2 lines
  const firstSpaceIndex = name.indexOf(" ");
  const firstName =
    firstSpaceIndex !== -1 ? name.slice(0, firstSpaceIndex) : name;
  const lastName =
    firstSpaceIndex !== -1 ? name.slice(firstSpaceIndex + 1) : "";

  return (
    <Flex
      direction="column"
      alignItems="center"
      rounded="md"
      padding="8"
      position="relative"
      shadow={{ md: "base" }}
    >
      <Box
        position="absolute"
        bottom="0"
        width="full"
        height="2"
        bgGradient={`linear(40deg, ${color}.50, ${color}.100)`}
        roundedBottom="inherit"
      />
      <Avatar size="3xl" src={headshot} borderRadius="5px" />
      <Box textAlign="left">
        <Heading size="md" as="h2" marginTop="4px" textAlign="center">
          {firstName}
          <br />
          {lastName}
        </Heading>
      </Box>
    </Flex>
  );
};

export default PlayerCard;
