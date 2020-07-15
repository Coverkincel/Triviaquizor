import React, { Component } from 'react';
import './answer.css';

export default class Answer extends Component {
  render() {
    let answerStyle;
    if (
      this.props.correctAnswer === this.props.value &&
      this.props.showColors
    ) {
      answerStyle = {
        background: '#79bd31'
      };
    } else if (this.props.showColors) {
      answerStyle = {
        background: '#d8465e'
      };
    }

    return (
      <li>
        <button
          disabled={this.props.disabled}
          className='answer'
          onClick={() => this.props.submitAnswer(this.props.value)}
          style={answerStyle}
        >
          {this.props.value}
        </button>
      </li>
    );
  }
}
