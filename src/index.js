import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const initialState = {
    hideUI: false,
    coins: 100,
    coinsMore: true,
    shopToggled: false,
    items: {
        skipper: 0,
        corrects: 0
    }
};

function reducer(state = initialState, action) {
    let coinsMore = true
    switch(action.type) {
        case 'INCREMENT':
            if (state.coins + 1 > 49) {
                coinsMore = true
            } else {
                coinsMore = false
            }
            return {
                ...state,
                coins: state.coins + 1,
                coinsMore: coinsMore
            }
        case "ADD_VALUE":
            if (state.coins + action.value > 49) {
                coinsMore = true
            } else {
                coinsMore = false
            }
            return {
                ...state,
                coins: state.coins + action.value,
                coinsMore: coinsMore
            }
        case "SWITCH_UI": {
            return {
                ...state,
                hideUI: !state.hideUI
            }
        }

        case "TOOGLE_SHOP":
            console.log('to')
            return {
                ...state,
                shopToggled: !state.shopToggled
            }

        case "BUY_ITEM":
            if (action.item === 'skipper') {
                return {
                    ...state,
                    items: {
                        corrects: state.items.corrects,
                        skipper: state.items.skipper + 1
                    }
                }
            } else if (action.item === 'correct') {
                return {
                    ...state,
                    items: {
                        skipper: state.items.skipper,
                        corrects: state.items.corrects + 1
                    }
                }
            }
            break;
        default: return state;
        }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());




ReactDOM.render(
<Provider store={store}>
<App />
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
