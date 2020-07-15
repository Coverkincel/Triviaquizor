import React, { Component } from 'react';
import './menu.css';
import { categories } from '../categoryList';
import {connect} from 'react-redux';
import Odometer from 'react-odometerjs';

class menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRulesToggled: false,
      isCategoriesToggled: false,
      categoryName: 'All categories'
    };
    this.toggleRules = this.toggleRules.bind(this);
    this.toggleCategories = this.toggleCategories.bind(this);
    this.toggleShop = this.toggleShop.bind(this);
  }

  toggleRules() {
    this.setState({
      isRulesToggled: !this.state.isRulesToggled,
      isCategoriesToggled: false
    });
  }

  toggleCategories() {
    this.setState({
      isCategoriesToggled: !this.state.isCategoriesToggled,
      isRulesToggled: false
    });
  }

  setCategoryName(categoryName) {
    this.setState({
      categoryName: categoryName
    });
  }

  toggleShop() {
    this.props.dispatch({type: "TOOGLE_SHOP"})
  }

  render() {
    const {isCategoriesToggled, categoryName } = this.state;
    return (
      <div className='main-menu-container'>
                    <h1 className='title'>Trivia quiz</h1>


        {!this.props.shopToggled ? <div>
          {!isCategoriesToggled ? (
          <div className='header'>
            
            {!this.props.hideUI ? <div className='settings'>

              <button
                className='button button-categories'
                onClick={() => {
                  this.toggleCategories();
                  this.props.triviaSwitch();
                }}
              >
                <h3>
                  <i className='fas fa-cog'></i> Categories
                </h3>
              </button>
            </div> : null}
            
          </div>
        ) : (
          <div className='categories-container'>
                    <div className='category'>

          <div className='category-container'>
            <h3 className='category-title'>Current category</h3>
            <p className='category-name'>{categoryName}</p>
          </div>


          {!isCategoriesToggled ?           <div className="coins-container">
              <div className="coins">
              <i className="fas fa-coins"></i> {this.props.coins}
              </div>
              <div className="shop">
                SHOP
              </div>
            </div> : null}


        </div>
            <h1>Category list</h1>
            <p>Choose any category you want to answer questions on!</p>
            <ul className='category-list'>
              <li className='category-item'>
                <button
                  className='category-button'
                  onClick={() => {
                    this.props.applyCategory(1);
                    this.toggleCategories();
                    this.setCategoryName('All categories');
                  }}
                >
                  All categories (default)
                </button>
              </li>
              {categories.map(category => {
                return (
                  <li className='category-item' key={category.id}>
                    <button
                      onClick={() => {
                        this.props.applyCategory(category.id);
                        this.toggleCategories();
                        this.setCategoryName(category.name);
                      }}
                      className='category-button'
                    >
                      {category.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        </div> : null}

        


        {


        }
        {!isCategoriesToggled ?         <div className='category'>

          {!this.props.shopToggled ? <div className='category-container'>
            <h3 className='category-title'>Current category</h3>
            <p className='category-name'>{categoryName}</p>
          </div> : null}
          




              { !isCategoriesToggled ?           <div className="coins-container">
              <div className="coins">
              <i className="fas fa-coins"></i> 
              <Odometer value={this.props.coins} format="(.ddd),dd" />

              </div>
              {!this.props.hideUI ?               <div className="shop">
                
                <button onClick={this.toggleShop}>              <i className="fas fa-shopping-cart"></i>
                SHOP</button>
            
              </div> : null}


            </div> : null}


        </div> : null}

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hideUI: state.hideUI,
  coins: state.coins,
  shopToggled: state.shopToggled
})

export default connect(mapStateToProps)(menu);