import React, { Component } from 'react'
import M from 'materialize-css';
import Axios from 'axios';
import { connect } from 'react-redux';

function send_message(props, to, msg) {
    Axios.post("http://localhost:8080/api/send_message", {
        id : props.auth.uid,
        token : props.auth.key,
        to,
        msg
    }).then(response => {
        if (response.data.status === 1) {
            this.setState({
                msg : ""
            });
        } else {
            M.toast({html : "Une erreur est servenue. Merci de réessayer ultérieurement.", classes : "red"});
        }
    });
}

function get_message(props, to) {
    Axios.post("http://localhost:8080/api/get_conv", {
        id : props.auth.uid,
        token : props.auth.key,
        to,
    }).then(response => {
        if (response.data.status === 1) {
            if (JSON.stringify(response.data.success) !== JSON.stringify(this.state.content)) {
                console.log(response.data.success);
                console.log("Updating conversation");
                this.setState({
                    content : response.data.success
                });
            }
        } else {
            M.toast({html : "Une erreur est servenue. Merci de réessayer ultérieurement.", classes : "red"});
        }
    });
}

class Room extends Component {

    constructor(props) {
        super(props);

        this.state = {
            msg : "",
            to : props.to,
            from : props.auth.uid,
            content : [],
            current_index : 0,
        }

        this.snd_msg = send_message.bind(this);
        this.rcv_msg = get_message.bind(this);
        this.interval = setInterval(this.handleUpdateRoom, 2500);
    }

    handleUpdateRoom = () => {
        console.log("Update message in progress");
        this.rcv_msg(this.props, this.state.to);
    }

    handleSend = (e) => {
        console.log("sending : [" + this.state.msg + "]");
        this.snd_msg(this.props, this.state.to, this.state.msg);
    }

    handleMsgUpdate = (e) => {
        this.setState({
            msg : e.target.value
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="room">
                <div className="room-msg">

                </div>
                <div className="divider center"></div>
                <div className="field-wrapper">
                    <div className="input-field col s12">
                        <input type="text" name="msg" id="msg" onChange={(e) => {this.handleMsgUpdate(e)}}/>
                        <label htmlFor="msg">Message</label>
                    </div>
                    <div className="btn send" value={this.state.msg} onClick={(e) => {this.handleSend(e)}}><i className="far fa-paper-plane"></i></div>
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
