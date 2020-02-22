import React, { Component } from 'react'
import M from 'materialize-css';
import Axios from 'axios';
import { connect } from 'react-redux';
import Room from './Room';

function get_rooms(props) {
    Axios.post("http://localhost:8080/api/get_room", {
        id : props.auth.uid,
        token : props.auth.key
    }).then(response => {
        console.log(response);
        this.setState({
            rooms : [...this.state.rooms, ...response.data.success]
        });
    });
}

function send_message(props, to, msg) {
    Axios.post("http://localhost:8080/api/send_message", {
        id : props.auth.uid,
        token : props.auth.key,
        to,
        msg
    }).then(response => {
        console.log(response);
    });
}

function get_message(props, to) {
    Axios.post("http://localhost:8080/api/get_conv", {
        id : props.auth.uid,
        token : props.auth.key,
        to,
    }).then(response => {
        console.log(response);
    });
}

class Chat extends Component {

    // rooms : [login, firstname, lastname]
    state = {
        rooms : [
            {login : 1, firstname : "Laure", lastname : "Varich"},
            {login : 2, firstname : "Lucie", lastname : "Blue"},
            {login : 3, firstname : "Katrine", lastname : "Azure"},
            {login : 4, firstname : "Nathalie", lastname : "Huils"},
            {login : 5, firstname : "Patricia", lastname : "Ulrich"},
        ]
    }

    constructor(props) {
        super(props);

        this.get_all_rooms = get_rooms.bind(this);
        this.snd = send_message.bind(this);
        this.get = get_message.bind(this);
    }

    createRoom = (userId) => {

    }

    sendMessageTo = (userId, message) => {

    }

    getMessageFrom = (userId) => {

    }

    componentDidMount() {
        M.Tabs.init(this.Tabs);
        let rooms = this.get_all_rooms(this.props);
        console.log(rooms);
    }

    render() {
        return (
            <div className="conv-anchor">
                <div className="conv">
                    <div className="row">
                        <div className="col s12">
                            <ul className="tabs tabs-fixed-width" ref={Tabs => {this.Tabs = Tabs;}}>
                                <li className="tab col s3"><a href="#test1">Test 1</a></li>
                                {
                                    this.state.rooms.map(room => {
                                        return <li className="tab col s3" key={room.login}><a href={ "#" + room.login }>{ room.firstname + " " + room.lastname }</a></li>
                                    })
                                }
                                {/*<li className="tab col s3"><a className="active" href="#test2">Test 2</a></li>
                                <li className="tab col s3"><a href="#test3">Test 3</a></li>
                                <li className="tab col s3"><a href="#test4">Test 4</a></li>*/}
                            </ul>
                        </div>
                        <div className="room-container z-depth-3">
                            <Room />
                            <div id="test1" className="col s12">Test 1</div>
                            <div id="2" className="col s12">Test 2</div>
                            <div id="3" className="col s12">Test 3</div>
                            <div id="4" className="col s12">Test 4</div>
                        </div>
                    </div>
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

export default connect(mapStateToProps)(Chat)
