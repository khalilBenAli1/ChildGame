const initialState = {
  gameMode: null,
  playerCount: 0,
  playerNames: [],
  teamsInfo: [],
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_GAME_MODE":
      return {
        ...state,
        gameMode: action.payload,
      };
    case "SET_PLAYER_COUNT":
      return {
        ...state,
        playerCount: action.payload,
      };
    case "SET_PLAYER_NAMES":
      return {
        ...state,
        playerNames: action.payload,
      };
    case "SET_TEAMS_INFO":
      return {
        ...state,
        teamsInfo: action.payload,
      };
    default:
      return state;
  }
};

export default gameReducer;
