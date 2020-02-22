import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks, { SignedInLinksSidebar } from './SignedInLinks';
import SignedOutLinks, { SignedOutLinksSidebar } from './SignedOutLinks';
import M from 'materialize-css';
import { connect } from 'react-redux';
import { authOut } from '../../store/actions/authActions';
import { add_notif, delete_notif, read_notif } from '../../store/actions/notifActions';
import Axios from 'axios';

class Navbar extends Component {

    constructor (props) {
        super(props);

        this.state = {
            needs_update : 1
        };
    }

    componentDidMount() {
        const options = {
            inDuration: 250,
            outDuration: 200,
            draggable: true,
            edge : "right"
        };
        M.Sidenav.init(this.Sidenav, options);

        console.log("mounted");
        if (this.props.auth.uid !== -1)
            this.interval = setInterval(this.handleNotifUpdate, 2500);
    }

    handleNav = () => {
        M.Sidenav.getInstance(this.Sidenav).close();
    }

    handleLogout = () => {
        if (!(this.props.auth && this.props.auth.uid && this.props.auth.key)) {
            return ;
        }
        Axios.get("http://localhost:8080/api/logout?id=" + this.props.auth.uid + "&token=" + this.props.auth.key);
        this.props.authLogout();
        M.Sidenav.getInstance(this.Sidenav).close();
    }

    containNotThisNotif = (notif) => {
        let exist = true;
        this.props.notifs.forEach(n => {
            if (n.id === notif.id) exist = false;
        });
        return exist;
    }

    handleNotifUpdate = () => {
        if (this.state.needs_update === 0) return ;
        this.setState({
            needs_update : 0
        });
        Axios.post("http://localhost:8080/api/get_notif", {
            id : this.props.auth.uid,
            token : this.props.auth.key,
        }).then(response => {
            if (response.data.status === 1) {
                let notifs = response.data.success;
                notifs.forEach(element => {
                    if (this.containNotThisNotif(element)) {
                        M.toast({html : element.msg});
                        this.props.notifA(element);
                    }
                })
                this.setState({
                    needs_update : 1
                })
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const auth = this.props.auth.id !== -1 && this.props.auth.key != null;
        const main_links = auth ? <SignedInLinks onLogout={this.handleLogout} state={this.props.auth}/> : <SignedOutLinks />;
        const side_links = auth ? <SignedInLinksSidebar onClickLink={this.handleNav} onLogout={this.handleLogout} state={this.props.auth}/> : <SignedOutLinksSidebar onClickLink={this.handleNav}/>;
        // const main_links = <div><SignedInLinks onLogout={this.handleLogout}/><SignedOutLinks /></div>;
        // const side_links = <div><SignedInLinksSidebar onClickLink={this.handleNav} onLogout={this.handleLogout}/><SignedOutLinksSidebar onClickLink={this.handleNav}/></div>;
        return (
            <nav className="nav-wrapper white">
                <Link to='/' className="brand-logo black-text logo">Matcha'Soul</Link>
                { main_links }
                <a href="#!" data-target="slide-out" className="sidenav-trigger right">
                    <i className="material-icons">menu</i>
                </a>
                <ul ref={Sidenav => { this.Sidenav = Sidenav; }} id="slide-out" className="sidenav">
                    { side_links }
                </ul>
            </nav>
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
        authLogout : () => { dispatch(authOut()) },
        notifA : (notif) => { dispatch(add_notif(notif)) },
        notifD : (notif) => { dispatch(delete_notif(notif)) },
        notifR : (notif) => { dispatch(read_notif(notif)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
