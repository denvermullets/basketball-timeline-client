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
};

const PlayBar: React.FC<PlayBarProps> = ({ pause, setPause, currentYear }) => {
  const navigate = useNavigate();
  const previousYear = () => {
    navigate(`/?team=PHO&year=${currentYear - 1}`);
    window.location.reload();
  };

  const nextYear = () => {
    navigate(`/?team=PHO&year=${currentYear + 1}`);
    window.location.reload();
  };

  return (
    <Box
      marginX="auto"
      marginY={2}
      width="30%"
      rounded="md"
      overflow="hidden"
      boxShadow="md"
      fontSize="md"
    >
      <Flex bg="gray.800" paddingX={2} paddingY={2} gap={2}>
        <IconButton
          aria-label="Go Back a Year"
          icon={<IoPlaySkipBackSharp size="lg" />}
          onClick={previousYear}
        />
        <IconButton
          aria-label="Go Back a Game"
          icon={<IoPlayBackSharp size="lg" />}
          onClick={previousYear}
        />
        <IconButton
          aria-label="Pause Season Recap"
          icon={pause ? <IoPlaySharp size="lg" /> : <IoPlayOutline size="lg" />}
          onClick={() => setPause(!pause)}
        />
        <IconButton
          aria-label="Go Forward a Game"
          icon={<IoPlayForwardSharp size="lg" />}
          onClick={nextYear}
        />
        <IconButton
          aria-label="Go Forward a Year"
          icon={<IoPlaySkipForwardSharp size="lg" />}
          onClick={nextYear}
        />
      </Flex>
    </Box>
  );
};

export default PlayBar;
