import React, { Component } from 'react';
import Answer from './answer';
import './trivia.css';
import { connect } from 'react-redux';
import HANDLE_SCORE_CHANGE from '../actions/handleScoreChange';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      category: '',
      correct_answer: '',
      difficulty: '',
      incorrect_answers: [],
      question: '',
      answers: [],
      loading: true,
      isAnswersDisabled: false,
      showColors: false,
      currentScore: 0
    };
    this.getQuestionData = this.getQuestionData.bind(this);
    this.decodeHTML = this.decodeHTML.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.disableQuestion = this.disableQuestion.bind(this);
    this.handleScore = this.handleScore.bind(this);
  }

  decodeHTML(html) {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  //difficulty we take from trivia state.

  handleScore(isCorrect) {
    let newScore;
    switch (this.state.difficulty) {
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
    if (!isCorrect) {
      newScore = -newScore;
    }
    this.setState({
      currentScore: this.state.currentScore + newScore
    });
  }

  getQuestionData() {
    const currentQuestion = this.props.questions[this.state.questionNumber];
    const decodedQuestion = this.decodeHTML(currentQuestion.question);
    let incorrect_answers = currentQuestion.incorrect_answers;
    incorrect_answers.push(currentQuestion.correct_answer);
    const answers = this.shuffleArray(incorrect_answers);
    const correctAnswer = this.decodeHTML(currentQuestion.correct_answer);
    this.setState(
      {
        category: currentQuestion.category,
        correct_answer: correctAnswer,
        difficulty: currentQuestion.difficulty,
        incorrect_answers: currentQuestion.incorrect_answers,
        question: decodedQuestion,
        answers: answers,
        loading: false
      },
      () => {
        this.setState({
          isAnswersDisabled: false,
          showColors: false
        });
      }
    );
  }

  updateQuestion() {
    this.setState(
      {
        questionNumber: this.state.questionNumber + 1
      },
      () => {
        this.getQuestionData();
      }
    );
  }

  disableQuestion() {
    this.setState({
      isAnswersDisabled: true,
      showColors: true
    });
  }

  //dispatch in if(s)

  submitAnswer(data) {
    const difficulty = this.state.difficulty;
    if (data === this.state.correct_answer) {
      if (this.state.questionNumber === this.props.questions.length - 1) {
        // right answer. set isTrivia to false (overflow)
        this.disableQuestion();
        this.props.dispatch(HANDLE_SCORE_CHANGE(true, difficulty));
        setTimeout(this.props.isTriviaSwitch, 3000);
      } else {
        // right answer. next question number (+1 state) and update question (no overflow)
        this.disableQuestion();
        this.props.dispatch(HANDLE_SCORE_CHANGE(true, difficulty));
        setTimeout(this.updateQuestion, 2000);
      }
    } else {
      if (this.state.questionNumber === this.props.questions.length - 1) {
        // wrong answer + overflow. set isTrivia to false
        this.props.dispatch(HANDLE_SCORE_CHANGE(false, difficulty));
        this.disableQuestion();
        setTimeout(this.props.isTriviaSwitch, 3000);
      } else {
        // no overflow + wrong answer next question number (+1 state) and update question
        this.props.dispatch(HANDLE_SCORE_CHANGE(false, difficulty));
        this.disableQuestion();
        setTimeout(this.updateQuestion, 2000);
      }
    }
  }

  componentDidMount() {
    this.getQuestionData();
  }

  render() {
    const {
      correct_answer,
      difficulty,
      question,
      answers,
      loading
    } = this.state;
    if (loading) {
      return <h1>loading!</h1>;
    } else {
      return (
        <div className='trivia-container'>
          <p className='difficulty'>
            <i>Difficulty:</i> {difficulty}
          </p>
          <h3 className='question'>{question}</h3>
          <ul className='answers-list'>
            {answers.map(answer => {
              const answerDecoded = this.decodeHTML(answer);
              return (
                <Answer
                  showColors={this.state.showColors}
                  correctAnswer={correct_answer}
                  disabled={this.state.isAnswersDisabled}
                  value={answerDecoded}
                  submitAnswer={this.submitAnswer}
                />
              );
            })}
          </ul>
          <h4>Your score: {this.props.score}</h4>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  score: state.scoreReducer.score
});

export default connect(mapStateToProps)(Trivia);
