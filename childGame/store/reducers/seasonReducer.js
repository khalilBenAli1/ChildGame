const initialState = {
  seasons: [
    {
      title: "Spring",
      numberOfChallenges: 15,
      difficulty: "Easy",
      challenges: [
        {
          id: 1,
          type: "question",
          question: "What is the capital of France?",
          answer: "Paris",
          responses: {},
        },
        {
          id: 2,
          type: "guess_word",
          question: "Guess the word depicted by the image.",
          answer: "Eiffel Tower",
          responses: {},
        },
      ],
      playable: false,
      completed: false,
    },
    {
      title: "Summer",
      numberOfChallenges: 20,
      difficulty: "Medium",
      challenges: [
        {
          id: 1,
          type: "question",
          question: "What is the capital of France?",
          answer: "Paris",
          responses: {},
        },
        {
          id: 2,
          type: "guess_word",
          question: "Guess the word depicted by the image.",
          answer: "Eiffel Tower",
          responses: {},
        },
      ],
      playable: false,
      completed: false,
    },
    {
      title: "Autumn",
      numberOfChallenges: 10,
      difficulty: "Hard",
      challenges: [
        {
          id: 1,
          type: "question",
          question: "What is the capital of France?",
          answer: "Paris",
          responses: {},
        },
        {
          id: 2,
          type: "guess_word",
          question: "Guess the word depicted by the image.",
          answer: "Eiffel Tower",
          responses: {},
        },
      ],
      playable: false,
      completed: false,
    },
    {
      title: "Winter",
      numberOfChallenges: 5,
      difficulty: "Medium",
      challenges: [
        {
          id: 1,
          type: "question",
          question: "What is the capital of France?",
          answer: "Paris",
          responses: {},
        },
        {
          id: 2,
          type: "guess_word",
          question: "Guess the word depicted by the image.",
          answer: "Eiffel Tower",
          responses: {},
        },
      ],
      playable: false,
      completed: false,
    },
  ],
  
};

const seasonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RESPONSE":
      return {
        ...state,
        seasons: state.seasons.map((season) => {
          if (season.title === action.payload.seasonTitle) {
            return {
              ...season,
              challenges: season.challenges.map((challenge) => {
                if (challenge.id === action.payload.challengeId) {
                  return {
                    ...challenge,
                    responses: {
                      ...challenge.responses,
                      [action.payload.teamId]: action.payload.response,
                    },
                  };
                }
                return challenge;
              }),
            };
          }
          return season;
        }),
      };
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
    default:
      return state;
  }
};

export default seasonReducer;
