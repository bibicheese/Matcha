import React, { Component } from 'react'

class Message extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content : props.msg,
            from : props.from,
            to : props.to,
            uid : props.login,
        }
    }

    render() {
        const classOfChip = this.state.uid === this.state.to ? "receiver" : "sender";
        return (
            <div className={ "chip message " + classOfChip }>
                {this.state.content}
            </div>
        )
    }
}

export default Message
