import { Avatar, Box, Flex, HStack, Heading, VStack } from "@chakra-ui/react";

type PlayerCardProps = {
  headshot: string;
  name: string;
};

const PlayerCard: React.FC<PlayerCardProps> = ({ headshot, name }) => {
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
        height="3"
        bgGradient="linear(40deg, purple.500, orange.500)"
        roundedBottom="inherit"
      />
      <Avatar size="3xl" src={headshot} borderRadius="5px" />
      <VStack spacing="1" flex="1">
        <HStack>
          <Heading size="md" as="h2" marginTop="4px">
            {name}
          </Heading>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default PlayerCard;
