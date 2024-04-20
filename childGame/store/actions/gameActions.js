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

export const setCurrentPlayer = (playerName) => ({
  type: "SET_CURRENT_PLAYER",
  payload: playerName,
});

export const updateScore = (playerName, score) => ({
  type: "UPDATE_SCORE",
  payload: { playerName, score },
});

export const toggleRound = () => ({
    type: "TOGGLE_ROUND"
  });