import React, { Component } from 'react'
import Answer from './answer';

export default class Trivia extends Component {
    constructor(props){
        super(props);
        this.state = {
            questionNumber: 0,
            category: '',
            correct_answer: '',
            difficulty: '',
            incorrect_answers: [],
            question: '',
            answers: [],
            loading: true
        }
        this.getQuestionData = this.getQuestionData.bind(this);
        this.decodeHTML = this.decodeHTML.bind(this);
        this.shuffleArray = this.shuffleArray.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
    }

    decodeHTML(html) {
        let txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    shuffleArray(a) {
        for (let i = a.length-1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    getQuestionData() {
        const currentQuestion = this.props.questions[this.state.questionNumber];
        const decodedQuestion = this.decodeHTML(currentQuestion.question);
        let incorrect_answers = currentQuestion.incorrect_answers;
        incorrect_answers.push(currentQuestion.correct_answer);
        const answers = this.shuffleArray(incorrect_answers);
        const correctAnswer = this.decodeHTML(currentQuestion.correct_answer);
        this.setState({
            category: currentQuestion.category,
            correct_answer: correctAnswer,
            difficulty: currentQuestion.difficulty,
            incorrect_answers: currentQuestion.incorrect_answers,
            question: decodedQuestion,
            answers: answers,
            loading: false
        });
    }

    submitAnswer(data) {
        if (data === this.state.correct_answer) {
        if (this.state.questionNumber === this.props.questions.length - 1) {
            console.log('right answer. set isTrivia to false (overflow)')
            this.props.isTriviaSwitch()
        } else {
            console.log('right answer. next question number (+1 state) and update question (no overflow)');

            this.setState({
                questionNumber: this.state.questionNumber + 1
            }, () => {
                this.getQuestionData();
            });
        }
        } else {
            if (this.state.questionNumber === this.props.questions.length - 1) {
                console.log('wrong answer + overflow. set isTrivia to false')
                this.props.isTriviaSwitch()
            } else {
                console.log('no overflow + wrong answer next question number (+1 state) and update question')
                this.setState({
                    questionNumber: this.state.questionNumber + 1
                }, () => {
                    this.getQuestionData();
                });
            }
        }
    }

    componentDidMount(){
        this.getQuestionData()
    }

    render() {
        const {correct_answer, difficulty, question, answers, loading} = this.state;
        if (loading) {
            return <h1>loading!</h1>
        } else {
        return (
            <div>
                <p>difficulty: {difficulty}</p>
                <h3>{question}</h3>
                <h4>correct answer: {correct_answer}</h4>
                <ul>
                    {
                        answers.map(answer => {
                            const answerDecoded = this.decodeHTML(answer);
                            return <Answer value={answerDecoded} submitAnswer={this.submitAnswer}/>
                        })
                    }
                </ul>
            </div>
        )}
        
    }
}
