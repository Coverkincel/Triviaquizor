const initialScore = {
  score: 0
};
// we're giving isCorrect and difficulty in action
const scoreReducer = (state = initialScore, action) => {
  switch (action.type) {
    case 'HANDLE_SCORE_CHANGE':
      if (!action.isCorrect) {
        if (state.score - 150 <= 0) {
          return {
            score: 0
          };
        } else {
          return {
            score: state.score - 150
          };
        }
      } else {
        let newScore;
        switch (action.difficulty) {
          case 'easy':
            newScore = 100;
            break;
          case 'medium':
            newScore = 200;
            break;
          case 'hard':
            newScore = 300;
            break;
          default:
            newScore = 0;
        }
        return {
          score: state.score + newScore
        };
      }
    default:
      return state;
  }
};

export default scoreReducer;
