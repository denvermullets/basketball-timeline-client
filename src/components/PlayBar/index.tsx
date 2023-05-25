import { Flex, IconButton } from "@chakra-ui/react";
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
import { retroYearEnds } from "../PlayerGrid/helpers";

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
  const isRetro =
    Object.prototype.hasOwnProperty.call(retroYearEnds, currentTeam) &&
    currentYear <= Number(retroYearEnds[currentTeam]);
  const previousYear = () => {
    navigate(`/?team=${currentTeam}&year=${currentYear - 1}`);
    window.location.reload();
  };

  const nextYear = () => {
    navigate(`/?team=${currentTeam}&year=${currentYear + 1}`);
    window.location.reload();
  };

  const iconSize = "20px";
  const buttonSize = "sm";
  const startGradient = isRetro ? `${currentTeam}retro` : currentTeam;
  const endGradient = isRetro ? `${currentTeam}retro` : currentTeam;

  return (
    <Flex
      rounded="md"
      boxShadow="md"
      bgGradient={`linear(40deg, ${startGradient}.100, ${endGradient}.50)`}
      paddingX={2}
      paddingY={2}
      gap={2}
      width="auto"
    >
      <IconButton
        size={buttonSize}
        aria-label="Go Back a Year"
        icon={<IoPlaySkipBackSharp size={iconSize} />}
        onClick={previousYear}
      />
      <IconButton
        size={buttonSize}
        aria-label="Go Back a Game"
        icon={<IoPlayBackSharp size={iconSize} />}
        onClick={() => setCurrentGame(currentGame - 1)}
      />
      <IconButton
        size={buttonSize}
        aria-label="Pause Season Recap"
        icon={pause ? <IoPlaySharp size={iconSize} /> : <IoPlayOutline size={iconSize} />}
        onClick={() => setPause(!pause)}
      />
      <IconButton
        size={buttonSize}
        aria-label="Go Forward a Game"
        icon={<IoPlayForwardSharp size={iconSize} />}
        onClick={() => setCurrentGame(currentGame + 1)}
      />
      <IconButton
        size={buttonSize}
        aria-label="Go Forward a Year"
        icon={<IoPlaySkipForwardSharp size={iconSize} />}
        onClick={nextYear}
      />
    </Flex>
  );
};

export default PlayBar;
