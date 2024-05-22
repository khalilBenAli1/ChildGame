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

export const toggleRound = (value) => ({
  type: "TOGGLE_ROUND",
  payload: value ,
});

export const resetPlayerInfo = () => ({
  type: "RESET_PLAYER_INFO",
});

export const resetAll = () => ({
  type: "RESET_ALL",
});

export const setGuessWord = (word) => ({
  type: "SET_GUESS_WORD",
  payload: word,
});

// Reset the guess word
export const resetGuessWord = () => ({
  type: "RESET_GUESS_WORD",
});

export const setScore = (playerName, score) => ({
  type: "SET_SCORE",
  payload: { playerName, score },
});

// Action to add points
export const addPoints = (playerName, points) => ({
  type: "ADD_POINTS",
  payload: { playerName, points },
});

// Action to subtract points
export const subtractPoints = (playerName, points) => ({
  type: "SUBTRACT_POINTS",
  payload: { playerName, points },
});