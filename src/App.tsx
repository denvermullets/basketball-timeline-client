import { Box } from "@chakra-ui/react";
import GameView from "./views/GameView";
import { useLocation } from "react-router-dom";

function App() {
  // when params change this will force a reload to ensure animations properly load
  const location = useLocation();
  return (
    <Box width="100%" alignItems="center" padding={0} margin={0}>
      <GameView key={location.key} />
    </Box>
  );
}

export default App;
