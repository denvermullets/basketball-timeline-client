import React, { useEffect, useState } from "react";
import { Box, Flex, Select } from "@chakra-ui/react";
import PlayBar from "../PlayBar";
import { Team } from "../../views/GameView";
import { useNavigate } from "react-router-dom";

type TeamNavigationdProps = {
  pause: boolean;
  setPause: (pause: boolean) => void;
  currentYear: number;
  currentTeam: string;
  currentGame: number;
  setCurrentGame: (currentGame: number) => void;
  teams: Team[];
  lastGame: number;
};

const TeamNavigation: React.FC<TeamNavigationdProps> = ({
  pause,
  setPause,
  currentYear,
  currentTeam,
  currentGame,
  setCurrentGame,
  teams,
  lastGame,
}) => {
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState<string>(currentTeam);
  const [selectedYear, setSelectedYear] = useState<number | string>(currentYear);
  const [teamYears, setTeamYears] = useState<number[]>([]);
  const loadTeamYears = (teamAbbreviation: string) => {
    const findNewTeam = teams.find((team) => team.abbreviation === teamAbbreviation);

    if (findNewTeam) {
      const years = [];
      const endYear = findNewTeam.year_end || 2023;
      for (let year = findNewTeam.year_start; year <= endYear; year++) {
        years.push(year);
      }

      return years;
    }
  };

  useEffect(() => {
    const findNewTeam = teams.find((team) => team.abbreviation === selectedTeam);

    if (findNewTeam) {
      const years = [];
      const endYear = findNewTeam.year_end || 2023;
      for (let year = findNewTeam.year_start; year <= endYear; year++) {
        years.push(year);
      }

      setTeamYears(years);
    }
  }, [selectedTeam, teams]);

  const handleTeamChange = (newTeam: string) => {
    const newYears = loadTeamYears(newTeam);

    if (newYears && newYears?.length > 0) {
      if (selectedYear && newYears.includes(Number(selectedYear))) {
        navigate(`/?team=${newTeam}&year=${selectedYear}`, { replace: true });
      } else {
        setSelectedTeam(newTeam);
        setSelectedYear("");
      }
    }
  };

  return (
    <Box
      mx="auto"
      my={2}
      width="225px"
      rounded="md"
      overflow="hidden"
      boxShadow="md"
      fontSize="xs"
      backgroundColor="white"
    >
      <Flex bg="gray.200" px={2} py={2}>
        <PlayBar
          pause={pause}
          setPause={setPause}
          currentYear={currentYear}
          currentTeam={currentTeam}
          currentGame={currentGame}
          setCurrentGame={setCurrentGame}
          years={teamYears}
          lastGame={lastGame}
        />
      </Flex>
      <Box px={2} py={2} alignItems="center">
        {teams.length > 0 && (
          <Select
            placeholder="Select Team"
            size="sm"
            value={selectedTeam}
            onChange={(e) => handleTeamChange(e.target.value)}
            marginBottom={2}
            rounded="md"
            borderColor={`${selectedTeam}.50`}
          >
            {teams.map((team: Team, index: number) => (
              <option value={team.abbreviation} key={team.abbreviation + index}>
                {team.name}
              </option>
            ))}
          </Select>
        )}
        {teams.length > 0 && (
          <Select
            rounded="md"
            placeholder="Select Year"
            size="sm"
            value={selectedYear}
            borderColor={`${selectedTeam}.50`}
            onChange={(e) =>
              navigate(`/?team=${selectedTeam}&year=${Number(e.target.value)}`, { replace: true })
            }
          >
            {teamYears.map((year: number) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </Select>
        )}
      </Box>
    </Box>
  );
};

export default TeamNavigation;
