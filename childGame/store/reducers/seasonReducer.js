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
    case "UPDATE_SEASON_PLAYABILITY":
      return {
        ...state,
        seasons: state.seasons.map((season) => {
          if (season.title === action.payload.seasonTitle) {
            return { ...season, playable: action.payload.isPlayable };
          }
          return season;
        }),
      };
    case "SET_CURRENT_SEASON":
      return {
        ...state,
        currentSeason: state.seasons[action.payload],
      };
    case "RESET_ALL":
      return { ...initialState };
    default:
      return state;
  }
};

export default seasonReducer;
