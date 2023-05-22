import { Box, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import {
  IoPlaySkipForwardSharp,
  IoPlaySkipBackSharp,
  IoPlayForwardSharp,
  IoPlayBackSharp,
  IoPlaySharp,
  IoPlayOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type PlayBarProps = {
  pause: boolean;
  setPause: (pause: boolean) => void;
  currentYear: number;
  currentTeam: string;
  currentGame: number;
  setCurrentGame: (currentGame: number) => void;
};

const PlayBar: React.FC<PlayBarProps> = ({
  pause,
  setPause,
  currentYear,
  currentTeam,
  currentGame,
  setCurrentGame,
}) => {
  const navigate = useNavigate();
  const previousYear = () => {
    navigate(`/?team=${currentTeam}&year=${currentYear - 1}`);
    window.location.reload();
  };

  const nextYear = () => {
    navigate(`/?team=${currentTeam}&year=${currentYear + 1}`);
    window.location.reload();
  };

  return (
    <Box
      marginX="auto"
      marginY={2}
      // width="30%"
      rounded="md"
      overflow="hidden"
      boxShadow="md"
      fontSize="md"
    >
      <Flex
        bgGradient={`linear(40deg, ${currentTeam}.100, ${currentTeam}.50)`}
        paddingX={2}
        paddingY={2}
        gap={2}
      >
        <IconButton
          aria-label="Go Back a Year"
          icon={<IoPlaySkipBackSharp size="24px" />}
          onClick={previousYear}
        />
        <IconButton
          aria-label="Go Back a Game"
          icon={<IoPlayBackSharp size="24px" />}
          onClick={() => setCurrentGame(currentGame - 1)}
        />
        <IconButton
          aria-label="Pause Season Recap"
          icon={pause ? <IoPlaySharp size="24px" /> : <IoPlayOutline size="24px" />}
          onClick={() => setPause(!pause)}
        />
        <IconButton
          aria-label="Go Forward a Game"
          icon={<IoPlayForwardSharp size="24px" />}
          onClick={() => setCurrentGame(currentGame + 1)}
        />
        <IconButton
          aria-label="Go Forward a Year"
          icon={<IoPlaySkipForwardSharp size="24px" />}
          onClick={nextYear}
        />
      </Flex>
    </Box>
  );
};

export default PlayBar;
