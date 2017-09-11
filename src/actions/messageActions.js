import MessagesApi from '../api/messagesApi';
import {
    LOAD_MESSAGES,
    BULK_MESSAGE_SELECTED,
    MESSAGE_SELECTED,
    UPDATE_READ_MESSAGES,
    UPDATE_STARRED_MESSAGE,
    DELETE_MESSAGES,
    ADD_REMOVE_LABELS,
    TOGGEL_COMPOSED_FORM,
    CREATE_MESSAGE
} from './actionTypes';

export function fetchMessages() {
    return async (dispatch) => {
        const messages = await MessagesApi.getAllMessages();

        dispatch({ type: LOAD_MESSAGES, messages })
    }
}

export function addMessage(subject, body) {
    return async (dispatch, getState) => {
        const messages = getState().message.messages;

        await MessagesApi.addMessage(subject, body);

        const newMessages = [...messages, {
            id:'',
            subject,
            body,
            read: false,
            starred: false,
            labels:[]
        }];

        dispatch({type: CREATE_MESSAGE, messages: newMessages});
        dispatch({type: TOGGEL_COMPOSED_FORM})
    }
}

export function messageSelected(id, isSelected) {
    return (dispatch, getState) => {
        const messages = getState().message.messages;

        const newMessages = messages.map( message =>
            message.id === id ? {...message, selected: isSelected} : message)

        dispatch({ type: MESSAGE_SELECTED, messages: newMessages });
    }
}

export function bulkMessageSelected(isAllSelected) {
    return (dispatch, getState) => {
        const messages = getState().message.messages;
        const newMessages = messages.map( message =>
            message.selected !== isAllSelected ? {...message, selected: isAllSelected } : message);

        dispatch({ type: BULK_MESSAGE_SELECTED, messages: newMessages });
    }
}

export function updateMessageStarred(id, isStarred) {
    return async (dispatch, getState) => {
        const messages = getState().message.messages;

        await MessagesApi.updateStarredMessage(id, isStarred);

        const newMessages = messages.map( message =>
            message.id === id ? {...message, starred: isStarred} : message)

        dispatch({ type: UPDATE_STARRED_MESSAGE, messages: newMessages });
    }
}

export function updateMessageReadUnread(isRead) {
    return async (dispatch, getState) => {
        const messages = getState().message.messages;

        const updatedMessageIds = getSelectedReadUnreadMessageIds(messages, isRead);
        await MessagesApi.updateReadMessage(updatedMessageIds, isRead);

        const newMessages = messages.map( message =>
            message.selected && message.read !== isRead ? {...message, read: isRead} : message);

        dispatch({ type: UPDATE_READ_MESSAGES, messages: newMessages });
    }
}

export function deleteSelectedMessages() {
    return async (dispatch, getState) => {
        const messages = getState().message.messages;

        const deletedMessageIds = getSelectedMessageIds(messages);
        await MessagesApi.deleteMessages(deletedMessageIds);

        const newMessages = messages.filter(message => !message.selected);

        dispatch({ type: DELETE_MESSAGES, messages: newMessages });

    }
}

export function addRemoveLabels(labelName, isAdd) {
    return async (dispatch, getState) => {
        const messages = getState().message.messages;

        let updatedMessageIds = [];

        const newMessages = messages.map( message => {
            let newMessage = {};
            let newLabels = [];
            if (message.selected) {
                let labelExists = doesLabelExist(message, labelName);

                if (isAdd && !labelExists) {
                    updatedMessageIds.push(message.id)
                    newLabels = [...message.labels, labelName];
                    newMessage = {...message, labels: newLabels }

                } else if (!isAdd && labelExists) {
                    updatedMessageIds.push(message.id)
                    newLabels = message.labels.filter(label => label !== labelName);
                    newMessage = {...message, labels: newLabels}
                } else {
                    newMessage = message;
                }
            } else {
                newMessage = message;
            }
            return newMessage
        });

        await MessagesApi.addRemoveLabel(updatedMessageIds, isAdd, labelName);

        dispatch({ type: ADD_REMOVE_LABELS, messages: newMessages });

    }
}


const getSelectedMessageIds = (messages) => {
    const selectedMessageIds = [];

    messages.forEach(message => {
        if (message.selected) {
            selectedMessageIds.push(message.id);
        }
    });

    return selectedMessageIds;
}

const getSelectedReadUnreadMessageIds = (messages, isRead) => {
    const selectedMessageIds = [];

    messages.forEach(message => {
        if (message.selected && message.read !== isRead) {
            selectedMessageIds.push(message.id);
        }
    });

    return selectedMessageIds;
}

const doesLabelExist = (message, labelName) => {
    let indexOfItem = message.labels.findIndex(label => {return label === labelName;});
    return indexOfItem !== -1;
}

/*
  steps to call API

   1 - dispatch({type: CREATE_MESSAGE_REQUESTED})  send action to reducer

   2 - update api post logic

   3 - dispatch({type: CREATE_MESSAGE_SUCCEEDED, message(s): message(s) })
 */
