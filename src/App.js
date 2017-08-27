import React, { Component } from 'react';

import './App.css';
import ToolBar from  './components/Toolbar';
import Messages from './components/Messages';
import MessagesApi from './api/messagesApi';
import ComposedForm from './components/ComposedForm';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            toggleComposedForm: false
        }
    }

    async componentDidMount() {
        const messages = await MessagesApi.getAllMessages();
        this.setState({ messages });
    }

    handleOnBulkSelectedClick = isAllSelected  => {
        const messages = [...this.state.messages];
        messages.forEach(item => item.selected = isAllSelected);
        this.setState({ messages });
    }

    handelOnReadUnreadClick = async isRead => {
        const updatedMessageIds = [];
        const messages = [...this.state.messages];

        messages.forEach(message => {
            if (message.selected && message.read !== isRead )
                message.read = isRead
                updatedMessageIds.push(message.id)
        });
        await MessagesApi.updateReadMessage(updatedMessageIds, isRead);
        this.setState({ messages });
    }

    handleOnAddRemoveLabels = async (labelName, isAdd ) => {
        const updatedMessageIds = [];
        const messages = [...this.state.messages];

        messages.forEach(message => {
            if (message.selected)  {
                let labelExists = this.doesLabelExist(message, labelName);

                if (isAdd && !labelExists) {
                    updatedMessageIds.push(message.id)
                    message.labels.push(labelName);

                } else if(!isAdd && labelExists) {
                    updatedMessageIds.push(message.id)
                    message.labels = message.labels.filter(label => label !== labelName);
                }
            }
        });

        await MessagesApi.addRemoveLabel(updatedMessageIds, isAdd, labelName);
        this.setState({ messages });
    }


    handleOnDeleteMessages = async () => {
        const updatedMessageIds = [];

        this.state.messages.forEach(message => {
            if (message.selected) {
                updatedMessageIds.push(message.id);
            }
        });
        await MessagesApi.deleteMessages(updatedMessageIds);

        const messages = this.state.messages.filter(message => !message.selected);
        this.setState({ messages })
    }

    handleMessageChanged = async (updatedMessage, action) => {
        if (action === 'starred') {
            await MessagesApi.updateStarredMessage(updatedMessage.id, updatedMessage.starred);
        }
        const indexOfMessageToUpdate = this.state.messages.findIndex(message => {return message.id === updatedMessage.id;});
        const messages = [...this.state.messages];
        messages[indexOfMessageToUpdate] = updatedMessage;
        this.setState({ messages });
    }

    handleOnToggleComposedForm = () => {
        this.setState(prevState => ({ toggleComposedForm: !prevState.toggleComposedForm}))
    }

    handleOnAddMessage = async (subject, body) => {
        const repsonse = await MessagesApi.addMessage(subject, body);

        /*
        removed(like others) / because for now..refresh is needed manually
        if (response.success) {
            const messages = await MessagesApi.getAllMessages();
            this.setState(prevState => (
                { messages,
                  toggleComposedForm: !prevState.toggleComposedForm}))
        }*/

        const messages = [...this.state.messages];
        messages.push( {
            id:'',
            subject,
            body,
            read:false,
            starred:false,
            labels:[]
        });

        this.setState(prevState => (
            { messages,
                toggleComposedForm: !prevState.toggleComposedForm}))

    }

    doesLabelExist = (message, labelName) => {
        let indexOfItem = message.labels.findIndex(label => {return label === labelName;});
        return indexOfItem !== -1;
    }
    render() {
        if (!this.state.messages.length) return (<div>Loading...</div>)
        return (
          <div>
              <ToolBar
                  messages={ this.state.messages }
                  onBulkSelected={ this.handleOnBulkSelectedClick}
                  onAddRemoveLabel={ this.handleOnAddRemoveLabels }
                  onDeleteMessages={ this.handleOnDeleteMessages }
                  onReadUnreadClicked={ this.handelOnReadUnreadClick }
                  onToggleComposedForm={ this.handleOnToggleComposedForm}
              />
              { this.state.toggleComposedForm &&
                <ComposedForm onAddMessage={this.handleOnAddMessage}/> }
              <Messages
                  messages={ this.state.messages }
                  onChanged={ this.handleMessageChanged }
              />
          </div>
        );
    }
}

export default App;
