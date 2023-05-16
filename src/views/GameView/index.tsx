import { Flex } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import PlayerCard from "../../components/PlayerCard";
import axios from "axios";

export type Games = Game[];

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
}

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
  const [games, setGames] = useState<Game[]>([]);
  const [currentGame, setCurrentGame] = useState<number>(0);

  const loadInfo = async () => {
    try {
      const info = await axios.get(
        "http://localhost:3000/api/v1/starting_stats?team=PHO"
      );
      if (info.data) {
        console.log(info.data);
        setGames(info.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!games.length) {
      loadInfo();
    }
  }, [games]);

  useEffect(() => {
    console.log("currentGame", currentGame);

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
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" gap={4}>
      <br />
      <AnimatePresence mode="popLayout">
        {games?.length && (
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
            />
          </motion.div>
        )}
        {games?.length &&
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
              <PlayerCard headshot={player.headshot_url} name={player.name} />
            </motion.div>
          ))}
      </AnimatePresence>
    </Flex>
  );
};

export default GameView;
