//Individual or team
export const setGameMode = (mode) => ({
  type: "SET_GAME_MODE",
  payload: mode,
});

// Set the number of players
export const setPlayerCount = (count) => ({
  type: "SET_PLAYER_COUNT",
  payload: count,
});

// Set the names of players-
export const setPlayerNames = (names) => ({
  type: "SET_PLAYER_NAMES",
  payload: names,
});

// Set the info of Teams
export const setTeamsInfo = (teamsInfo) => ({
  type: "SET_TEAMS_INFO",
  payload: teamsInfo,
});