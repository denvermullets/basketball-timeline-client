import { Game } from "../../views/GameView";

// last year of retro colors
export const retroYearEnds: Record<string, number> = {
  ATL: 2015,
  CLE: 2003,
  DAL: 2001,
  DEN: 2018,
  GSW: 2010,
  HOU: 1995,
  MIA: 1999,
  MIL: 1993,
  PHO: 2000,
  SAS: 2002,
};

// some teams have retro colors available
export const retroYear = (games: Game[], team: string, currentGame = 0) => {
  return games[currentGame].year <= Number(retroYearEnds[team]);
};
