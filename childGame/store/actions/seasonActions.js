export const addResponse = (seasonTitle, challengeId, teamId, response) => ({
  type: "ADD_RESPONSE",
  payload: { seasonTitle, challengeId, teamId, response },
});

export const updateSeasonPlayability = (seasonTitle, isPlayable) => ({
  type: "UPDATE_SEASON_PLAYABILITY",
  payload: { seasonTitle, isPlayable },
});

export const updateSeasonStatus = (seasonTitle, completed) => ({
  type: "UPDATE_SEASON_STATUS",
  payload: { seasonTitle, completed },
});

export const setCurrentSeason = (seasonIndex) => ({
  type: "SET_CURRENT_SEASON",
  payload: seasonIndex,
});

export const resetSeasonAll = () => ({
  type: "RESET_ALL",
});

export const changeLanguage = (language) => ({
  type: "CHANGE_LANGUAGE",
  payload: language,
});