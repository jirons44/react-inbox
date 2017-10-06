import { connect } from 'react-redux'
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';


import './App.css';
import ToolBar from  './components/Toolbar';
import Messages from './components/Messages';
import ComposedForm from './components/ComposedForm';
import * as toolbarActions from './actions/toolbarActions';
import * as messageActions from './actions/messageActions';

class App extends Component {

    handleOnAddMessage = async (subject, body, history) => {
        this.props.actions.addMessage(subject, body, history);
    }

    render() {
        if (!this.props.messages.allIds.length) {
            return (
                <div>Loading...</div>)
        }

        return (
          <div>
              <ToolBar messages={ this.props.messages }/>

              <Route exact path="/compose" render={ () =>
                  <ComposedForm onAddMessage={this.handleOnAddMessage}  /> }/>

              <Messages />
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

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))
