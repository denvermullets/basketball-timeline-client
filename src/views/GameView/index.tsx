import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  VStack,
  useBreakpointValue,
  useToken,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Scoreboard from "../../components/Scoreboard";
import { useLocation } from "react-router-dom";
import PlayerGrid from "../../components/PlayerGrid";
import PlayBar from "../../components/PlayBar";
import { retroYear, retroYearEnds } from "../../components/PlayerGrid/helpers";

export interface Game {
  id: number;
  team_id: number;
  leader_id: number;
  date: string;
  opponent: string;
  game_won: boolean;
  team_points: number;
  opponent_points: number;
  win: number;
  loss: number;
  leader: Leader;
  players: Player[];
  team: Team;
  year: number;
  playoffs: boolean;
}

type Team = {
  name: string;
  abbreviation: string;
};

export interface Leader {
  name: string;
  url: string;
  headshot_url: string;
}

export interface Player {
  name: string;
  headshot_url: string;
  reference_url: string;
}

const GameView: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const homeTeam = queryParams.get("team");
  const year = queryParams.get("year");
  const [games, setGames] = useState<Game[]>([]);
  const [currentGame, setCurrentGame] = useState<number>(0);
  const [pause, setPause] = useState<boolean>(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const isRetro =
    games.length > 0 &&
    homeTeam &&
    Object.prototype.hasOwnProperty.call(retroYearEnds, homeTeam) &&
    retroYear(games, homeTeam);

  const color = isRetro ? `${homeTeam}retro` : homeTeam;

  const Stripes = () => {
    const firstColor = useToken("colors", `${color}.100`);

    return (
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="stripes"
            patternUnits="userSpaceOnUse"
            width="10"
            height="10"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="20" style={{ stroke: firstColor, strokeWidth: 5 }} />
          </pattern>
          <linearGradient id="gradient" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "white", stopOpacity: 0.75 }} />
            <stop offset="15%" style={{ stopColor: "white", stopOpacity: 0.35 }} />
            <stop offset="100%" style={{ stopColor: "white", stopOpacity: 0.01 }} />
          </linearGradient>

          <mask id="mask">
            <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" />
          </mask>
        </defs>
        <g mask="url(#mask)">
          <rect width="100%" height="100%" fill="url(#stripes)" />
        </g>
      </svg>
    );
  };

  useEffect(() => {
    const loadInfo = async () => {
      try {
        const info = await axios.get(
          `http://localhost:3000/api/v1/starting_stats?team=${homeTeam}&year=${year}`
        );
        if (info.data) {
          console.log(info.data);
          setGames(info.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (!games.length && homeTeam && year) {
      loadInfo();
    }
  }, [games, homeTeam, year]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentGame !== games.length - 1 && !pause) {
        console.log(currentGame, games.length);
        setCurrentGame((prevGame) => prevGame + 1);
      } else {
        return;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentGame, games, pause]);

  return (
    <>
      {games?.length > 0 && year && homeTeam && (
        <Container
          maxWidth="80%"
          padding={0}
          shadow="lg"
          marginTop={5}
          borderColor={`${color}.50`}
          borderWidth={1}
          rounded="md"
          position="relative"
          overflow="hidden"
          backgroundColor="white"
        >
          <Box position="absolute" w="100%" h="100%" top={0} left={0}>
            <Stripes />
          </Box>
          <Heading
            color="gray.100"
            roundedTop="md"
            padding={2}
            paddingLeft={4}
            bgGradient={`linear(40deg, ${color}.50, ${color}.100)`}
            position="relative"
            zIndex={10}
          >
            {games[0].team.name}
          </Heading>
          <Container maxW="700px" marginTop={5} position="relative">
            <Flex
              direction={{ base: "column", md: "row" }}
              flexWrap="wrap"
              alignItems="center"
              justifyContent="center"
              gap="4"
            >
              {homeTeam && year && (
                <PlayerGrid games={games} currentGame={currentGame} team={homeTeam} />
              )}
            </Flex>
          </Container>
          <Box padding={2} zIndex="10" position="relative">
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 1fr" }}
              alignItems="center"
              justifyContent="center"
              gap={4}
            >
              <VStack alignItems="center" justifyContent="center">
                <PlayBar
                  pause={pause}
                  setPause={setPause}
                  currentYear={Number(year)}
                  currentTeam={homeTeam}
                  currentGame={currentGame}
                  setCurrentGame={setCurrentGame}
                />
                <PlayBar
                  pause={pause}
                  setPause={setPause}
                  currentYear={Number(year)}
                  currentTeam={homeTeam}
                  currentGame={currentGame}
                  setCurrentGame={setCurrentGame}
                />
              </VStack>
              <Scoreboard
                date={String(games[currentGame].date)}
                homeScore={games[currentGame].team_points}
                awayScore={games[currentGame].opponent_points}
                teamName={games[currentGame].team.name}
                opponentName={games[currentGame].opponent}
                win={games[currentGame].win}
                loss={games[currentGame].loss}
                gameWon={games[currentGame].game_won}
              />
            </Grid>
          </Box>
        </Container>
      )}
    </>
  );
};

export default GameView;
