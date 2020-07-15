import React, { Component } from 'react';
import Trivia from './components/trivia';
import Menu from './components/menu';
import './App.css';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      questions: null,
      isTrivia: false,
      isTriviaMenu: true,
      category: 0,
      difficulty: 0,
      questionsNumber: 1
    };
    this.isTriviaSwitch = this.isTriviaSwitch.bind(this);
    this.apiCall = this.apiCall.bind(this);
    this.applyCategory = this.applyCategory.bind(this);
    this.switchTriviaMenu = this.switchTriviaMenu.bind(this);
    this.increment = this.increment.bind(this);
    this.addValue = this.addValue.bind(this);
    this.toggleShop = this.toggleShop.bind(this);
    this.buyItem = this.buyItem.bind(this);
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

  isTriviaSwitch(isStarted) {
    isStarted ? this.props.dispatch({type: "ADD_VALUE", value: -50}) : console.log('passed')
    this.props.dispatch({type: "SWITCH_UI"})
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

  increment = () => {
    this.props.dispatch({type: "INCREMENT"})
  }

  addValue = (value) => {
    this.props.dispatch({type: "ADD_VALUE", value: value})
  }

  toggleShop() {
    this.props.dispatch({type: "TOOGLE_SHOP"})
  }

  buyItem(item) {
    if (item === 'skipper') {
      this.props.dispatch({type: "BUY_ITEM", item: 'skipper'})
    } else if (item === 'correct') {
      this.props.dispatch({type: "BUY_ITEM", item: 'correct'})
    }
  }


  render() {
    const { isTrivia, questions, isTriviaMenu } = this.state;
    if (!questions) {
      return <div>LOADING</div>;
    } else {
      return (

        <div className='main-container'>
          <div className='inner-container'>
            <div className="game">

        {/* 
            <button onClick={this.increment}>+</button>
          <button onClick = {() => this.addValue(10)}>REDUX ADD 10</button>
          <br/>

            coinsmore : {this.props.coinsMore ? "true" : 'flase'}
            REDUX HIDEUI: {this.props.hideUI ? "true" : "false"} <br/>
            REDUX COINS: {this.props.coins}
*/}

            <Menu
              applyCategory={this.applyCategory}
              triviaSwitch={this.switchTriviaMenu}
            />
    {!this.props.shopToggled ?             <div>
            {isTriviaMenu ? (
              <div className='trivia-menu'>
                <button className='button' onClick={() => this.isTriviaSwitch(this.props.coinsMore)}>
                  {' '}
                  {isTrivia ? (
                    <i className='fas fa-undo-alt'></i>
                  ) : (
                    <i className='far fa-play-circle'></i>
                  )}
                  {isTrivia ? ' Close' : 
                  <div> 
                    
                    <div>START 
                      {this.props.coinsMore ? <p style={{display: "inline"}}>-50  <i className="fas fa-coins"></i></p> : null}
                       </div>
                    
                    </div>
                  
                  }
                </button>
                {this.state.isTrivia ? (
                  <Trivia
                    questions={this.state.questions}
                    isTriviaSwitch={this.isTriviaSwitch}
                    questionsNumber={this.state.questionsNumber}
                  />
                ) : (
                  null
                )}
              </div>

            ) : null}
                        </div> : 
                        <div className="shop-component">
                          <ul className="shop-items"> 
                            <li className='shop-item'>
                              <button onClick={() => this.buyItem('skipper')} className='switchTriviaButton'>
                              Question skipper
                              </button>

                              </li>
                              <li className='shop-item'>
                              <button  onClick={() => this.buyItem('correct') }  className='switchTriviaButton' >
                              Correct answer
                              </button>
                              </li>
                              <li className='shop-item' lo>
                              <button onClick={this.toggleShop} className='switchTriviaButton'>
                              BACK
                              </button>
                              </li>
                          </ul>
                        </div>
                        }

          </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  coins: state.coins,
  hideUI: state.hideUI,
  coinsMore: state.coinsMore,
  shopToggled: state.shopToggled
})

export default connect(mapStateToProps)(App);