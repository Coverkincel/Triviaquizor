import React, {
    Component
} from 'react';
import './answer.css';

export default class Answer extends Component {
    render() {
            let answerStyle;
            if (this.props.correctAnswer === this.props.value && this.props.showColors) {
                answerStyle = {
                    background: 'green'
                }
            } else if (this.props.showColors) {
                answerStyle = {
                    background: 'red'
                }
            }

        return (
            <li>
                <button disabled={this.props.disabled} className='answer' onClick={()=>
                    this.props.submitAnswer(this.props.value)} style={answerStyle} >{this.props.value}</button>
            </li>
        )
    }
}