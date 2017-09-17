import { connect } from 'react-redux'
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import './App.css';
import ToolBar from  './components/Toolbar';
import Messages from './components/Messages';
import ComposedForm from './components/ComposedForm';
import * as toolbarActions from './actions/toolbarActions';
import * as messageActions from './actions/messageActions';

class App extends Component {

    handleOnAddMessage = async (subject, body) => {
        this.props.actions.addMessage(subject, body);
    }

    render() {
        if (!this.props.messages.allIds.length) {
            return (
                <div>Loading...</div>)
        }

        return (
          <div>
              <ToolBar
                  messages={ this.props.messages }
              />
              { this.props.displayComposedForm &&
                <ComposedForm onAddMessage={this.handleOnAddMessage}/> }
              <Messages
                  messages={ this.props.messages }
              />
          </div>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.messages,
    displayComposedForm: state.toolbarActions.toggleComposedForm
})

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            ...toolbarActions,
            ...messageActions
        }, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
