import React, { Component } from 'react';
import './menu.css';
import {categories} from '../categoryList'

export default class menu extends Component {

    constructor(props) {
        super (props);
        this.state = {
            isRulesToggled: false,
            isCategoriesToggled: false
        }
        this.toggleRules = this.toggleRules.bind(this);
        this.toggleCategories = this.toggleCategories.bind(this);
    }

    toggleRules() {
        this.setState({
            isRulesToggled: !this.state.isRulesToggled,
            isCategoriesToggled: false
        })
    }

    toggleCategories() {
        this.setState({
            isCategoriesToggled: !this.state.isCategoriesToggled,
            isRulesToggled: false
        })
    }


    render() {
        const {isRulesToggled, isCategoriesToggled} = this.state;
        return (
    <div className='main-menu-container'>

    {!isCategoriesToggled ? <div className='header'>
    <h1 className='title'>
        Trivia quiz
    </h1>
    <div className='settings'>
    <button className='button button-settings' onClick={this.toggleRules}>
        <h3><i className='fas fa-list'></i> Rules</h3>
    </button>
    <button className='button button-categories' onClick={() => {
        this.toggleCategories();
        this.props.triviaSwitch();
    }
        }>
        <h3><i className="fas fa-cog"></i> Categories</h3>
    </button>
        </div>
        {isRulesToggled ? <p className='rules-info'>Choose the category you like the most (or don't choose anything) and press start button.<br /> You will get Score-points for each correct answer, the amount of which depends on the difficulty <br />For each wrong answer you will lose score-points as well. <br/><br />Good luck to you!
          </p> : null}
          </div> : <div className='categories-container'>

<h1>Category list</h1>
<p>Choose any category you want to answer questions on!</p>
<ul className='category-list'>
    <li className='category-item'><button onClick={() => {
        this.props.applyCategory(1);
        this.toggleCategories()
        }}>All categories (default)</button></li>
    {categories.map(category => {
        return <li 
        className='category-item' 
        key={category.id}><button onClick={() => {
            this.props.applyCategory(category.id);
            this.toggleCategories()
        }}
        >{category.name}</button></li>
    })}
</ul>
</div>}
          </div>
        )
    }
}
