import React, { Component } from 'react'
import M from 'materialize-css';

class Chat extends Component {


    componentDidMount() {
        M.Tabs.init(this.Tabs);
    }

    render() {
        return (
            <div className="conv-anchor">
                <div className="conv">
                    <div className="row">
                        <div className="col s12">
                            <ul className="tabs tabs-fixed-width" ref={Tabs => {this.Tabs = Tabs;}}>
                                <li className="tab col s3"><a href="#test1">Test 1</a></li>
                                <li className="tab col s3"><a className="active" href="#test2">Test 2</a></li>
                                <li className="tab col s3"><a href="#test3">Test 3</a></li>
                                <li className="tab col s3"><a href="#test4">Test 4</a></li>
                                <li className="tab col s3"><a href="#test5">Test 5</a></li>
                                <li className="tab col s3"><a href="#test6">Test 6</a></li>
                                <li className="tab col s3"><a href="#test7">Test 7</a></li>
                                <li className="tab col s3"><a href="#test5">Test 5</a></li>
                                <li className="tab col s3"><a href="#test6">Test 6</a></li>
                                <li className="tab col s3"><a href="#test7">Test 7</a></li>
                                <li className="tab col s3"><a href="#test5">Test 5</a></li>
                                <li className="tab col s3"><a href="#test6">Test 6</a></li>
                                <li className="tab col s3"><a href="#test7">Test 7</a></li>
                                <li className="tab col s3"><a href="#test5">Test 5</a></li>
                                <li className="tab col s3"><a href="#test6">Test 6</a></li>
                                <li className="tab col s3"><a href="#test7">Test 7</a></li>
                                <li className="tab col s3"><a href="#test5">Test 5</a></li>
                                <li className="tab col s3"><a href="#test6">Test 6</a></li>
                                <li className="tab col s3"><a href="#test7">Test 7</a></li>
                            </ul>
                        </div>
                        <div id="test1" className="col s12">Test 1</div>
                        <div id="test2" className="col s12">Test 2</div>
                        <div id="test3" className="col s12">Test 3</div>
                        <div id="test4" className="col s12">Test 4</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat
