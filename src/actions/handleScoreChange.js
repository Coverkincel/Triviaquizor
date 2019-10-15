const HANDLE_SCORE_CHANGE = (isCorrect, difficulty) => {
  return {
    type: 'HANDLE_SCORE_CHANGE',
    isCorrect,
    difficulty
  };
};

export default HANDLE_SCORE_CHANGE;
