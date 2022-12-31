const initailState = {
  questionBank: [],
  currentQuestion: 0,
  touchedQuestion: [],
  tickedQuestions: [],
  correctAnswers: [],
  examTime: 1800000000
};
const examination = (state = initailState, action) => {
  switch (action.type) {
    case "FETCH_QUESTIONS":
      return {
        ...state,
        questionBank: action.payload,
      };
    case "SET_CURRENT_QUESTION":
      return {
        ...state,
        currentQuestion: action.payload,
      };
    case "FETCH_TOUCHED_QUESTIONS":
      return {
        ...state,
        touchedQuestion: action.payload,
      };
      case "FETCH_CORRECT_ANSWERS":
        return {
          ...state,
          correctAnswers: action.payload,
        };
      case "FETCH_TICKED_QUESTIONS":
        return {
          ...state,
          tickedQuestions: action.payload,
        };
      case "SET_TIME":
        return {
          ...state,
          examTime: action.payload,
        };

    default:
      return state;
  }
};

export default examination;
