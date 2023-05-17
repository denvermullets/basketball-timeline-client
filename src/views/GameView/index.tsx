import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import PlayerCard from "../../components/PlayerCard";
import axios from "axios";
import Scoreboard from "../../components/Scoreboard";
import { useLocation } from "react-router-dom";

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
      if (currentGame !== games.length - 1) {
        console.log(currentGame, games.length);
        setCurrentGame((prevGame) => prevGame + 1);
      } else {
        return;
      }
    }, 750);

    return () => {
      clearInterval(interval);
    };
  }, [currentGame, games]);

  return (
    <VStack spacing={4}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="stretch"
      >
        <AnimatePresence mode="popLayout">
          {games?.length > 0 && (
            <motion.div
              key={games[currentGame].leader.url}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{
                duration: 0.5,
              }}
              style={{ width: 200, height: 300 }}
              variants={{
                exit: {
                  opacity: 0,
                  y: -50,
                  transition: { duration: 0.05 },
                },
              }}
            >
              <PlayerCard
                headshot={games[currentGame].leader.headshot_url}
                name={games[currentGame].leader.name}
                color={games[currentGame].team.abbreviation}
              />
            </motion.div>
          )}
          {games?.length > 0 &&
            games[currentGame].players.map((player: Player, index) => (
              <motion.div
                key={player.reference_url}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  duration: 0.5,
                  delay: currentGame === 0 ? (index + 1) * 0.2 : 0,
                }}
                style={{ width: 200, height: 300 }}
                variants={{
                  exit: {
                    opacity: 0,
                    y: -50,
                    transition: { duration: 0.05 },
                  },
                }}
              >
                <PlayerCard
                  headshot={player.headshot_url}
                  name={player.name}
                  color={games[currentGame].team.abbreviation}
                />
              </motion.div>
            ))}
        </AnimatePresence>
        <Box>
          {games?.length > 0 && (
            <Scoreboard
              date={String(games[currentGame].date)}
              homeScore={games[currentGame].team_points}
              awayScore={games[currentGame].opponent_points}
              teamName={games[currentGame].team.name}
              opponentName={games[currentGame].opponent}
              win={games[currentGame].win}
              loss={games[currentGame].loss}
            />
          )}
        </Box>
      </Flex>
    </VStack>
  );
};

export default GameView;
