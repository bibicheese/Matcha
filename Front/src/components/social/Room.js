import React, { Component } from 'react'
import M from 'materialize-css';
import Axios from 'axios';
import { connect } from 'react-redux';

class Room extends Component {

    constructor(props) {
        super(props);

        this.state = {
            msg : "",
            to : props.to,
            from : props.auth.uid
        }
    }

    handleSend = () => {
        console.log("sending : [" + this.state.msg + "]");
    }

    handleMsgUpdate = (e) => {
        this.setState({
            msg : e.target.value
        });
    }

    render() {
        return (
            <div className="room">
                <div className="room-msg">

                </div>
                <div className="field-wrapper">
                    <div className="input-field col s12">
                        <input type="text" name="msg" id="msg" onChange={(e) => {this.handleMsgUpdate(e)}}/>
                    </div>
                    <div className="btn send" onClick={() => {this.handleSend()}}><i className="far fa-paper-plane"></i></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      ...state
    }
}

export default connect(mapStateToProps)(Room)
