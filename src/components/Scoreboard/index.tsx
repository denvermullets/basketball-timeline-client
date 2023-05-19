import { Badge, Box, Flex, Text } from "@chakra-ui/react";

import React from "react";

type ScoreboardProps = {
  date: string;
  teamName: string;
  homeScore: number;
  awayScore: number;
  opponentName: string;
  win: number;
  loss: number;
  gameWon: boolean;
};

const Scoreboard: React.FC<ScoreboardProps> = ({
  date,
  teamName,
  homeScore,
  awayScore,
  opponentName,
  win,
  loss,
  gameWon,
}) => {
  return (
    <Box
      mx="auto"
      my={2}
      width="300px"
      rounded="md"
      overflow="hidden"
      boxShadow="md"
      fontSize="xs"
    >
      <Flex bg="gray.200" px={2} py={2}>
        <Box w="1/6" color="gray.700" textAlign="right">
          {date}
        </Box>
      </Flex>

      <Flex px={2} py={2} alignItems="center">
        <Box w="5/12" display="flex" alignItems="center">
          {/* <Image
            boxSize={{ base: 6, sm: 10 }}
            mr={2}
            alignSelf="center"
            src="https://a1.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/GSW.png&h=70&w=70"
            alt="away-logo"
          /> */}
          <Box>
            <Text fontSize="sm" fontWeight="bold">
              {teamName}
            </Text>
            <Text display={{ base: "none", sm: "block" }} color="gray.600">
              {`${win} - ${loss}`}
            </Text>
          </Box>
        </Box>

        <Box flex="1" textAlign="right">
          <Text fontSize={{ base: "lg", sm: "xl" }} fontWeight="bold">
            {homeScore}
          </Text>
          <Badge colorScheme={gameWon ? "green" : "red"}>
            {gameWon ? "w" : "l"}
          </Badge>
        </Box>
      </Flex>

      <Flex px={2} py={2} alignItems="center">
        <Box w="5/12" display="flex" alignItems="center">
          {/* <Image
            boxSize={{ base: 6, sm: 10 }}
            mr={2}
            alignSelf="center"
            src="https://a1.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/scoreboard/tor.png&h=70&w=70"
            alt="away-logo"
          /> */}
          <Box>
            <Text fontSize="sm" fontWeight="bold">
              {opponentName}
            </Text>
          </Box>
        </Box>

        <Box flex="1" textAlign="right">
          <Text fontSize={{ base: "lg", sm: "xl" }} fontWeight="bold">
            {awayScore}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Scoreboard;
