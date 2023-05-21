import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Game, Player } from "../../views/GameView";
import PlayerCard from "../PlayerCard";
import { retroYearEnds } from "./helpers";

type PlayerGridProps = {
  games: Game[];
  currentGame: number;
  team: string;
};

const PlayerGrid: React.FC<PlayerGridProps> = ({
  games,
  currentGame,
  team,
}) => {
  // some teams have retro colors available
  const retroYear =
    games.length > 0 &&
    Object.prototype.hasOwnProperty.call(retroYearEnds, team) &&
    games[currentGame].year <= Number(retroYearEnds[team]);

  return (
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
            color={retroYear ? `${team}retro` : team}
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
                transition: { duration: 0.1 },
              },
            }}
          >
            <PlayerCard
              headshot={player.headshot_url}
              name={player.name}
              color={retroYear ? `${team}retro` : team}
            />
          </motion.div>
        ))}
    </AnimatePresence>
  );
};

export default PlayerGrid;
