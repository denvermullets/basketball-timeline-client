import { Box, Container, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Scoreboard from "../../components/Scoreboard";
import { useLocation } from "react-router-dom";
import PlayerGrid from "../../components/PlayerGrid";
import PlayBar from "../../components/PlayBar";

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
    }, 750);

    return () => {
      clearInterval(interval);
    };
  }, [currentGame, games, pause]);

  return (
    <>
      <Container maxW="700px">
        <Flex
          direction={{ base: "column", md: "row" }}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          gap="4"
        >
          <PlayerGrid games={games} currentGame={currentGame} />
        </Flex>
      </Container>
      <Box>
        {games?.length > 0 && (
          <>
            <PlayBar
              pause={pause}
              setPause={setPause}
              currentYear={Number(year)}
            />

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
          </>
        )}
      </Box>
    </>
  );
};

export default GameView;
