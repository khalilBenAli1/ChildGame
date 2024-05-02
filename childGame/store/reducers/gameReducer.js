const initialState = {
  gameMode: null,
  playerCount: 0,
  playerNames: [],
  teamsInfo: [],
  currentPlayerIndex: 0,
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
      case 'SET_CURRENT_PLAYER_INDEX':
        return {
          ...state,
          currentPlayerIndex: action.payload,
        };
    case "UPDATE_SCORE":
      const { playerName, isCorrect } = action.payload;
      const existingScores = state.scores[playerName] || {
        correct: 0,
        incorrect: 0,
      };

      return {
        ...state,
        scores: {
          ...state.scores,
          [playerName]: {
            correct: isCorrect
              ? existingScores.correct + 1
              : existingScores.correct,
            incorrect: !isCorrect
              ? existingScores.incorrect + 1
              : existingScores.incorrect,
          },
        },
      };

    case "TOGGLE_ROUND":
      return { ...state, roundStart: !state.roundStart };
    case "RESET_PLAYER_INFO":
      return {
        ...state,
        playerCount: 0,
        playerNames: [],
        currentPlayer: null,
        scores: {},
      };
    case "RESET_ALL":
      return { ...initialState };
    default:
      return state;
  }
};

export default gameReducer;
