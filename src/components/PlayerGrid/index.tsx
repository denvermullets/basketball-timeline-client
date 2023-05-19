import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Game, Player } from "../../views/GameView";
import PlayerCard from "../PlayerCard";

type PlayerGridProps = {
  games: Game[];
  currentGame: number;
};

const PlayerGrid: React.FC<PlayerGridProps> = ({ games, currentGame }) => {
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
  );
};

export default PlayerGrid;
