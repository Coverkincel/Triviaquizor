import React, { Component } from 'react'

export default class Answer extends Component {
    render() {
        return (
            <li>
                <button onClick={() => this.props.submitAnswer(this.props.value)}>{this.props.value}</button>
            </li>
        )
    }
}