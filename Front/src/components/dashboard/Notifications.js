import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';
import M from 'materialize-css';

class Notifications extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notifs : this.props.notifs
        }
    }


    componentDidMount = () => {

    }

    render() {
        console.log(this.state.notifs);
        return (
            <div className="container">
                <h3>Centre des notifications :</h3>
                {
                    this.state.notifs.map(n => {
                        const status = n.readen ? "<i className='fas fa-check green-text'></i>" : "<i className='fas fa-question'></i>";
                        return <div className="card notif-card" key={n.id}>
                            <div className="card-title">n-title</div>
                            <div className="card-content">n-content</div>
                            <div className="notif-status">{ status }</div>
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
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
