import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { messageBodySelected } from '../actions/messageActions'

class MessageBody extends Component {

    componentDidMount() {
        if (!this.props.message.body) {
            this.props.actions.messageBodySelected(this.props.message.id)
        }
    }
    componentWillReceiveProps(nextProps) {

    }

    render() {
        console.log("componentDidMount", this.props.message);

        if (!this.props.message || !this.props.message.body) {
            return null;
        }

        return (
            <div className="row message-body">
                <div className="col-xs-11 col-xs-offset-1">
                    {this.props.message.body}
                </div>
            </div>
       );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            messageBodySelected,
        }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(MessageBody)
