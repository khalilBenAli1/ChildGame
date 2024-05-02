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

export const setCurrentPlayerIndex = (index) => ({
  type: "SET_CURRENT_PLAYER_INDEX",
  payload: index,
});
export const updateScore = (playerName, isCorrect) => ({
  type: "UPDATE_SCORE",
  payload: { playerName, isCorrect },
});

export const toggleRound = () => ({
  type: "TOGGLE_ROUND",
});

export const resetPlayerInfo = () => ({
  type: "RESET_PLAYER_INFO",
});

export const resetAll = () => ({
  type: "RESET_ALL",
});
