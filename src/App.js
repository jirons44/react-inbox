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

    handleMessageChanged = (updatedMessage) => {
        const indexOfMessageToUpdate = this.state.messages.findIndex(message => {return message.id === updatedMessage.id;});
        const messages = [...this.state.messages];
        messages[indexOfMessageToUpdate] = updatedMessage;
        this.setState({ messages });
    }

    handleBulkMessageChecked = ( isAllSelected ) => {
        const messages = [...this.state.messages];
        messages.forEach(item => item.selected = isAllSelected);
        this.setState({ messages });
    }

    handleMarkcheckedAsRead = ( isRead ) => {
        const messages = [...this.state.messages];
        messages.forEach(message => message.selected ? message.read = isRead:'');
        this.setState({ messages });
    }

    render() {
        if (!this.state.messages.length) return (<div>Loading...</div>)
        return (
          <div>
              <ToolBar
                  messages={ this.state.messages }
                  onBulkChecked={ this.handleBulkMessageChecked }
                  onMarkCheckedRead= {this.handleMarkcheckedAsRead }
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
