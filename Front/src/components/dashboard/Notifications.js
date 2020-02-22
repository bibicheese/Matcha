import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';
import { read_notif } from '../../store/actions/notifActions';

//api/delete_notif id token + array with id of notif read
const read_notif_remote = (notif, props) => {
    Axios.post("http://localhost:8080/api/delete_notif", {
        id : props.auth.uid,
        token : props.auth.key,
        notif : [notif.id]
    });
}

class Notifications extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notifs : this.props.notifs,
            update : 0
        }
    }

    handleRead = (notif) => {
        if (notif.readen) return ;
        this.props.readNotif(notif);
        read_notif_remote(notif, this.props);
    }

    redirect = (e, login) => {
        if (e.nativeEvent.button === 1 || e.nativeEvent.button === 0) {
            if (e.nativeEvent.button === 1) {
                window.open("/profiles/" + login, "_blank");
            } else {
                this.props.history.push("/profiles/" + login);
            }
        }
    }

    getDisplay = () => {
        let dp = "";

        return dp;
    }

    render() {
        const notif_display = this.getDisplay();

        return (
            <div className="container">
                <h3>Centre des notifications :</h3>
                {
                    this.state.notifs.slice(0).reverse().map((n) => {
                        if (n.readen === 1) return null;
                        const status = n.readen ? <i className='fas fa-check green-text'></i> : <i className='fas fa-question'></i>;
                        return <div className="card" key={n.id}>
                            <div className={ n.readen ? "notif-card" : "notif-card notif-unread" }>
                                <div className="notif-timestamp">
                                    <span> { n.date } </span>
                                    <span> { n.hour } </span>
                                </div>
                                <div className="card-content click-on-me-notif" onMouseDown={(e) => {this.redirect(e, n.sender)}}>{ n.msg }</div>
                                <div className="notif-status" onClick={() => {this.handleRead(n)}}>{ status }</div>
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
