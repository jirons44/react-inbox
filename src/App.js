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

    handleOnBulkSelectedClick = isAllSelected => {
        this.props.actions.bulkMessageSelected(isAllSelected);
    }

    handleMessageChecked = (messageId, isSelected) => {
        this.props.actions.messageSelected(messageId, isSelected);
    }

    handleMessageStarred = (messageId, isStarred) => {
        this.props.actions.updateMessageStarred(messageId, isStarred);
    }

    handelOnReadUnreadClick = isRead => {
        this.props.actions.updateMessageReadUnread(isRead);
    }

    handleOnDeleteMessages = async () => {
        this.props.actions.deleteSelectedMessages();
    }

    handleOnToggleComposedForm = () => {
        this.props.actions.toggleComposedForm();
    }

    handleOnAddRemoveLabels = async (labelName, isAdd ) => {
        this.props.actions.addRemoveLabels(labelName, isAdd);
    }

    handleOnAddMessage = async (subject, body) => {
        this.props.actions.addMessage(subject, body);
    }

    render() {
        if (!this.props.messages.length) {
            return (
                <div>Loading...</div>)
        }

        return (
          <div>
              <ToolBar
                  messages={ this.props.messages }
                  onBulkSelected={ this.handleOnBulkSelectedClick}
                  onAddRemoveLabel={ this.handleOnAddRemoveLabels }
                  onDeleteMessages={ this.handleOnDeleteMessages }
                  onReadUnreadClicked={ this.handelOnReadUnreadClick }
                  onToggleComposedForm={ this.handleOnToggleComposedForm}
              />
              { this.props.displayComposedForm &&
                <ComposedForm onAddMessage={this.handleOnAddMessage}/> }
              <Messages
                  messages={ this.props.messages }
                  onChanged={ this.handleMessageStarred }
                  onMessageChecked= { this.handleMessageChecked }
              />
          </div>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.message.messages,
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
