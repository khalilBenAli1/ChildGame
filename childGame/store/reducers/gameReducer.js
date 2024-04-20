const initialState = {
  gameMode: null,
  playerCount: 0,
  playerNames: [],
  teamsInfo: [],
  currentPlayer: null,
  scores: {},
  roundStart: false,
  roundNumber: 1,
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
    case "SET_CURRENT_PLAYER":
      return { ...state, currentPlayer: action.payload };
    case "UPDATE_SCORE":
      const { playerName, score } = action.payload;
      return {
        ...state,
        scores: {
          ...state.scores,
          [playerName]: (state.scores[playerName] || 0) + score,
        },
      };
    case "TOGGLE_ROUND":
      return { ...state, roundStart: !state.roundStart };
    default:
      return state;
  }
};

export default gameReducer;
