import { Avatar, Box, Flex, Heading } from "@chakra-ui/react";

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
  const longLastName = lastName.length > 12;

  return (
    <Flex
      direction="column"
      alignItems="center"
      rounded="md"
      padding="8"
      position="relative"
      shadow={{ md: "base" }}
      borderWidth={1}
      borderColor={`${color}.50`}
    >
      <Box
        position="absolute"
        bottom="0"
        width="full"
        height="2"
        bgGradient={`linear(40deg, ${color}.50, ${color}.100)`}
        roundedBottom="inherit"
      />
      <Avatar
        size="3xl"
        src={headshot}
        borderRadius="5px"
        marginBottom={headshot ? 0 : "45px"}
      />
      <Box textAlign="left">
        <Heading
          size={longLastName ? "sm" : "md"}
          as="h2"
          marginTop="4px"
          textAlign="center"
          lineHeight="6"
        >
          {firstName}
          <br />
          {lastName}
        </Heading>
      </Box>
    </Flex>
  );
};

export default PlayerCard;
