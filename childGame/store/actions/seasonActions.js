export const addResponse = (seasonTitle, challengeId, teamId, response) => ({
  type: "ADD_RESPONSE",
  payload: { seasonTitle, challengeId, teamId, response },
});

export const updateSeasonPlayability = (seasonTitle, isPlayable) => ({
  type: "UPDATE_SEASON_PLAYABILITY",
  payload: { seasonTitle, isPlayable },
});
