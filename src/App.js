import React, { Component } from 'react';
import Trivia from './components/trivia';
import Menu from './components/menu';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      questions: null,
      isTrivia: false,
      isTriviaMenu: true,
      category: 0,
      difficulty: 0,
      questionsNumber: 10
    };
    this.isTriviaSwitch = this.isTriviaSwitch.bind(this);
    
    this.apiCall = this.apiCall.bind(this);
    this.applyCategory = this.applyCategory.bind(this);
    this.switchTriviaMenu = this.switchTriviaMenu.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  apiCall(URL) {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          questions: data.results,
          error: false
        });
      })
      .catch(
        error => console.error(error),
        () => {
          this.setState({
            error: true
          });
        }
      );
  }

  componentWillMount() {
    this.apiCall(
      `https://opentdb.com/api.php?amount=${this.state.questionsNumber}`
    );
  }

  isTriviaSwitch() {
    this.setState(
      {
        isTrivia: !this.state.isTrivia
      },
      () => {
        if (this.state.category !== 1 && this.state.category !== 0) {
          this.apiCall(
            `https://opentdb.com/api.php?amount=${this.state.questionsNumber}&category=` +
              this.state.category
          );
        } else {
          this.apiCall(
            `https://opentdb.com/api.php?amount=${this.state.questionsNumber}`
          );
        }
      }
    );
  }

  applyCategory(category) {
    this.switchTriviaMenu();
    this.setState({
      isTrivia: false,
      category: category
    });
    if (category === 1) {
      this.apiCall(
        `https://opentdb.com/api.php?amount=${this.state.questionsNumber}`
      );
    } else {
      this.apiCall(
        `https://opentdb.com/api.php?amount=15&category=${category}`
      );
    }
  }

  switchTriviaMenu() {
    this.setState({
      isTriviaMenu: !this.state.isTriviaMenu
    });
  }

  updateScore(score) {
    console.log(score);
  }

  render() {
    const { isTrivia, questions, isTriviaMenu } = this.state;
    if (!questions) {
      return <div>LOADING</div>;
    } else {
      return (
        <div className='main-container'>
          <div className='inner-container'>
            <Menu
              applyCategory={this.applyCategory}
              triviaSwitch={this.switchTriviaMenu}
            />

            {isTriviaMenu ? (
              <div className='trivia-menu'>
                <button className='button' onClick={this.isTriviaSwitch}>
                  {' '}
                  {isTrivia ? (
                    <i className='fas fa-undo-alt'></i>
                  ) : (
                    <i className='far fa-play-circle'></i>
                  )}
                  {isTrivia ? ' Close' : ' Start!'}
                </button>
                {this.state.isTrivia ? (
                  <Trivia
                    updateScore={this.updateScore}
                    questions={this.state.questions}
                    isTriviaSwitch={this.isTriviaSwitch}
                    questionsNumber={this.state.questionsNumber}
                  />
                ) : (
                  <h1>Score</h1>
                )}
              </div>
            ) : null}
          </div>
        </div>
      );
    }
  }
}
