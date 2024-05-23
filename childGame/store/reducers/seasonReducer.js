import { questions } from "../../data/questions";
const initialState = {
  seasons: [
    {
      title: "Printemps",
      numberOfChallenges: Math.floor(questions.length/2 +2),
      difficulty: "Facile",
      challenges: questions.slice(0, questions.length/2),
      playable: true,
      completed: false,
    },
    {
      title: "Été",
      numberOfChallenges: Math.floor(questions.length/2 +2),
      difficulty: "Medium",
      challenges: questions.slice( questions.length/2,questions.length),
      playable: false,
      completed: false,
    },
    {
      title: "Automne",
      numberOfChallenges: 10,
      difficulty: "Difficile",
      challenges: [],
      playable: false,
      completed: false,
    },
    {
      title: "Hiver",
      numberOfChallenges: 5,
      difficulty: "Difficile",
      challenges: [],
      playable: false,
      completed: false,
    },
  ],
  currentSeason: null,
};

const seasonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_SEASON":
      return {
        ...state,
        currentSeason: state.seasons[action.payload],
      };
    case "RESET_ALL":
      return { ...initialState };
      case "UPDATE_SEASON_STATUS":
        const newSeasons = state.seasons.map((season, index) => {
          if (season.title === action.payload.seasonTitle) {
            const updatedSeason = { ...season, completed: action.payload.completed };
            if (action.payload.completed && index + 1 < state.seasons.length-2) {
              state.seasons[index + 1].playable = true;  
            }
  
            return updatedSeason;
          }
          return season;
        });
        return {
          ...state,
          seasons: newSeasons
        };
    default:
      return state;
  }
};

export default seasonReducer;
