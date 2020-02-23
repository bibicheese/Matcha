import React, { Component } from 'react'

class Message extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content : props.msg,
            sender : props.sender,
            uid : props.uid,
        }
    }

    render() {
        const classOfChip = this.state.uid === this.state.sender ? "own" : "foreign";
        return (
            <div className={ "chip message " + classOfChip }>
                {this.state.content}
            </div>
        )
    }
}

export default Message
