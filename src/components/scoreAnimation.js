import React from 'react'
import Odometer from 'react-odometerjs';
import {connect} from 'react-redux';

class scoreAnimation extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                score animation
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    coins: state.coins,
    hideUI: state.hideUI
  })
  
  export default connect(mapStateToProps)(scoreAnimation);