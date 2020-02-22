import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';
import M from 'materialize-css';

class Notifications extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount = () => {

    }

    render() {
        return (
            <div className="container">

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
