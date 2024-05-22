const initialState = {
  gameMode: null,
  playerCount: 0,
  playerNames: [],
  teamsInfo: [],
  currentPlayerIndex: 0,
  scores: {},
  roundStart: true,
  roundNumber: 1,
  guessWord: "",
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
    case "SET_CURRENT_PLAYER_INDEX":
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
      return { ...state, roundStart: action.payload };
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
    case "SET_GUESS_WORD":
      return {
        ...state,
        guessWord: action.payload,
      };
    case "RESET_GUESS_WORD":
      return {
        ...state,
        guessWord: "",
      };
   
    case "ADD_POINTS":
      const { playerName: playerNameAdd, points } = action.payload;
      const scoresAdd = state.scores[playerNameAdd] || {
        correct: 0,
        incorrect: 0,
      };
      return {
        ...state,
        scores: {
          ...state.scores,
          [playerNameAdd]: {
            ...scoresAdd,
            correct: scoresAdd.correct + points,
          },
        },
      };

    case "SUBTRACT_POINTS":
      const { playerName: playerNameSub, points: pointsSub } = action.payload;
      const scoresSub = state.scores[playerNameSub] || {
        correct: 0,
        incorrect: 0,
      };
      return {
        ...state,
        scores: {
          ...state.scores,
          [playerNameSub]: {
            ...scoresSub,
            correct: Math.max(0, scoresSub.correct - pointsSub), 
          },
        },
      };
    default:
      return state;
  }
};

export default gameReducer;
