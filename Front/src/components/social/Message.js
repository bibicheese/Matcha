import React, { Component } from 'react'

class Message extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content : this.props.msg,
            from : this.props.from,
            to : this.props.to,
            uid : this.props.uid,
        }
    }

    render() {
        const classOfChip = this.state.uid === this.state.to ? "receiver" : "sender";
        return (
            <div className={ "chip " + classOfChip }>
                {this.content}
            </div>
        )
    }
}

export default Message
