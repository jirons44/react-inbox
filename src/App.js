import React, { Component } from 'react';
import './App.css';

import ToolBar from  './components/Toolbar';
import Messages from './components/Messages';
import MessagesApi from './api/mockMessagesApi';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
        }
    }

    componentDidMount() {
        this.setState({ messages: MessagesApi.getAllMessages() });
    }

    handleMessageChanged = updatedMessage => {
        const indexOfMessageToUpdate = this.state.messages.findIndex(message => {return message.id === updatedMessage.id;});
        const messages = [...this.state.messages];
        messages[indexOfMessageToUpdate] = updatedMessage;
        this.setState({ messages });
    }

    handleBulkMessageChecked = isAllSelected  => {
        const messages = [...this.state.messages];
        messages.forEach(item => item.selected = isAllSelected);
        this.setState({ messages });
    }

    handleMarkcheckedAsRead = isRead => {
        const messages = [...this.state.messages];
        messages.forEach(message => message.selected ? message.read = isRead:'');
        this.setState({ messages });
    }

    handleAddRemoveLabels = (labelName, isAdd ) => {
        const messages = [...this.state.messages];
        messages.forEach(message => {
            if (message.selected) {
                let indexOfItem = message.labels.findIndex(label => {return label === labelName;});
                if (indexOfItem < 0 && isAdd) {
                    message.labels.push(labelName);
                } else if(indexOfItem > -1 && !isAdd) {
                    message.labels = message.labels.filter(label => label !== labelName); //message.labels.splice(indexOfItem);
                }
            }
        });

        this.setState({ messages });

    }

    handleOnDeleteMessages = () => {
        const messages = this.state.messages.filter(message => !message.selected);
        this.setState({ messages })            ;
    }

    render() {
        if (!this.state.messages.length) return (<div>Loading...</div>)
        return (
          <div>
              <ToolBar
                  messages={ this.state.messages }
                  onBulkChecked={ this.handleBulkMessageChecked }
                  onMarkCheckedRead= {this.handleMarkcheckedAsRead }
                  onAddRemoveLabel={ this.handleAddRemoveLabels }
                  onDeleteMessages={ this.handleOnDeleteMessages }
              />
              <Messages
                  messages={ this.state.messages }
                  onChanged={ this.handleMessageChanged }
              />
          </div>
        );
    }
}

export default App;
