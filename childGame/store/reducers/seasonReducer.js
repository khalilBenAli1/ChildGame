import { questions } from "../../data/questions";
const initialState = {
  seasons: [
    {
      title: "Spring",
      numberOfChallenges: 15,
      difficulty: "Easy",
      challenges: questions.slice(0, 9),
      playable: true,
      completed: false,
    },
    {
      title: "Summer",
      numberOfChallenges: 20,
      difficulty: "Medium",
      challenges: questions.slice(9, 18),
      playable: false,
      completed: false,
    },
    {
      title: "Autumn",
      numberOfChallenges: 10,
      difficulty: "Hard",
      challenges: questions.slice(18, 26),
      playable: false,
      completed: false,
    },
    {
      title: "Winter",
      numberOfChallenges: 5,
      difficulty: "Medium",
      challenges: questions.slice(26, 34),
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
            if (action.payload.completed && index + 1 < state.seasons.length) {
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
