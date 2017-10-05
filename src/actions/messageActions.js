import * as types from '../actions/actionTypes';
import MessagesApi from '../api/messagesApi';


const messagesLoaded = messages => {
    return { type: types.LOAD_MESSAGES, messages }
}


export function fetchMessages() {
    return async dispatch => {
        const messages = await MessagesApi.getAllMessages();
        // dispatch({ type: types.LOAD_MESSAGES, messages })
        dispatch(messagesLoaded(messages));
    }
}

export function messageBodySelected(id) {

    return async dispatch => {
        const ids = [id];
        await MessagesApi.updateReadMessage(ids, true);


        const message = await MessagesApi.getMessage(id);
        dispatch({type: types.GET_MESSAGE_BODY, id, body: message.body})
    }
}

export function deleteSelectedMessages(ids) {
    return async dispatch => {
       await MessagesApi.deleteMessages(ids);
       dispatch({ type: types.DELETE_MESSAGES, ids });
    }
}

export function addMessage(subject, body, history) {
    return async dispatch => {
        const message = await MessagesApi.addMessage(subject, body);

        dispatch({type: types.CREATE_MESSAGE, message});

        history.push("/");
    }
}

export function toggelMessageSelected(id) {
    return dispatch => {
        dispatch({type: types.TOGGLE_MESSAGE_SELECTED, id});
    }
}

export function bulkMessageSelected(isAllSelected) {
    return dispatch => {
        dispatch({ type: types.BULK_MESSAGE_SELECTED, selected: isAllSelected });
    }
}

export function updateMessageStarred(id, isStarred) {
    return async dispatch => {
        await MessagesApi.updateStarredMessage(id, isStarred);

        dispatch({ type: types.UPDATE_STARRED_MESSAGE, id, starred: isStarred });
    }
}

export function updateMessageReadUnread(ids, isRead) {
    return async (dispatch) => {
        await MessagesApi.updateReadMessage(ids, isRead);

        dispatch({ type: types.UPDATE_READ_MESSAGES, ids, read: isRead });
    }
}

export function addLabel(ids, label) {
    return async (dispatch) => {
        await MessagesApi.addRemoveLabel(ids, true, label);

        dispatch({ type: types.ADD_LABELS, ids, label });
    }
}

export function removeLabel(ids, label) {
    return async (dispatch) => {
        await MessagesApi.addRemoveLabel(ids, false, label);

        dispatch({ type: types.REMOVE_LABELS, ids, label });
    }
}

/*
  steps to call API

   1 - dispatch({type: CREATE_MESSAGE_REQUESTED})  send action to reducer

   2 - update api post logic

   3 - dispatch({type: CREATE_MESSAGE_SUCCEEDED, message(s): message(s) })
 */
