import { questions } from "../../data/questions";
import { arabicQuestions } from "../../data/arabicQuestions";
const initialState = {
  seasons: [
    {
      title: "Printemps",
      numberOfChallenges: Math.floor(questions.length / 2 + 2),
      difficulty: "Facile",
      challenges: questions.slice(0, questions.length / 2),
      playable: true,
      completed: false,
    },
    {
      title: "Été",
      numberOfChallenges: Math.floor(questions.length / 2 + 2),
      difficulty: "Moyenne",
      challenges: questions.slice(questions.length / 2, questions.length),
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
  language: "fr",
};

const getSeasonsForLanguage = (language) => {
  const seasonsData = {
    en: [
      {
        title: "Spring",
        numberOfChallenges: Math.floor(questions.length / 2 + 2),
        difficulty: "Easy",
        challenges: questions.slice(0, questions.length / 2),
        playable: true,
        completed: false,
      },
      {
        title: "Summer",
        numberOfChallenges: Math.floor(questions.length / 2 + 2),
        difficulty: "Medium",
        challenges: questions.slice(questions.length / 2, questions.length),
        playable: false,
        completed: false,
      },
      {
        title: "Autumn",
        numberOfChallenges: 10,
        difficulty: "Hard",
        challenges: [],
        playable: false,
        completed: false,
      },
      {
        title: "Winter",
        numberOfChallenges: 5,
        difficulty: "Hard",
        challenges: [],
        playable: false,
        completed: false,
      },
    ],
    fr: [
      {
        title: "Printemps",
        numberOfChallenges: Math.floor(questions.length / 2 + 2),
        difficulty: "Facile",
        challenges: questions.slice(0, questions.length / 2),
        playable: true,
        completed: false,
      },
      {
        title: "Été",
        numberOfChallenges: Math.floor(questions.length / 2 + 2),
        difficulty: "Moyenne",
        challenges: questions.slice(questions.length / 2, questions.length),
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
    ar: [
      {
        title: "الربيع",
        numberOfChallenges: Math.floor(arabicQuestions.length / 2 + 2),
        difficulty: "سهل",
        challenges: arabicQuestions.slice(0, arabicQuestions.length / 2),
        playable: true,
        completed: false,
      },
      {
        title: "الصيف",
        numberOfChallenges: Math.floor(arabicQuestions.length / 2 + 2),
        difficulty: "متوسط",
        challenges: arabicQuestions.slice(arabicQuestions.length / 2, arabicQuestions.length),
        playable: false,
        completed: false,
      },
      {
        title: "الخريف",
        numberOfChallenges: 10,
        difficulty: "صعب",
        challenges: [],
        playable: false,
        completed: false,
      },
      {
        title: "الشتاء",
        numberOfChallenges: 5,
        difficulty: "صعب",
        challenges: [],
        playable: false,
        completed: false,
      },
    ],
  };
  console.log("seasonData",seasonsData[language])
  return seasonsData[language];
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
          const updatedSeason = {
            ...season,
            completed: action.payload.completed,
          };
          if (action.payload.completed && index + 1 < state.seasons.length) {
            state.seasons[index + 1].playable = true;
          }
          return updatedSeason;
        }
        return season;
      });
      return {
        ...state,
        seasons: newSeasons,
      };
    case "CHANGE_LANGUAGE":
      console.log(`Changing language to ${action.payload}`);
      const updatedSeasons = getSeasonsForLanguage(action.payload);
      console.log(`Updated seasons:`, updatedSeasons);
      return {
        ...state,
        seasons: updatedSeasons,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default seasonReducer;
