import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';
import M from 'materialize-css';
import { read_notif } from '../../store/actions/notifActions';

//api/delete_notif id token + array with id of notif read
const read_notif_remote = (notif, props) => {
    Axios.post("http://localhost:8080/api/delete_notif", {
        id : props.auth.uid,
        token : props.auth.key,
        notifs : [notif.id]
    });
}

class Notifications extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notifs : this.props.notifs
        }
    }


    componentDidMount = () => {

    }

    handleRead = (notif, index) => {
        this.props.read_notif(notif);
        read_notif_remote(notif, this.props);
    }

    render() {
        console.log(this.state.notifs);
        return (
            <div className="container">
                <h3>Centre des notifications :</h3>
                {
                    this.state.notifs.map((n, index) => {
                        const status = n.readen ? <i className='fas fa-check green-text'></i> : <i className='fas fa-question'></i>;
                        return <div className="card" key={n.id}>
                            <div className={ n.readen ? "notif-card" : "notif-card notif-unread" }>
                                <div className="notif-timestamp">
                                    <span> { n.date } </span>
                                    <span> { n.hour } </span>
                                </div>
                                <div className="card-content">{ n.msg }</div>
                                <div className="notif-status" onClick={this.handleRead(n, index)}>{ status }</div>
                            </div>
                        </div>
                    })
                }
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
        readNotif : (notif) => { dispatch(read_notif(notif)); }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
