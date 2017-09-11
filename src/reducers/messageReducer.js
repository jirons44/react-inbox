import * as types from '../actions/actionTypes';

// configureStore already set up state globally..do i need here...probably not
const initialState = {
    messages: [],
}

function leaderReducer(state = initialState , action) {

    switch(action.type) {
        case types.LOAD_MESSAGES:
        case types.BULK_MESSAGE_SELECTED:
        case types.MESSAGE_SELECTED:
        case types.UPDATE_STARRED_MESSAGE:
        case types.DELETE_MESSAGES:
        case types.UPDATE_READ_MESSAGES:
        case types.ADD_REMOVE_LABELS:
        case types.CREATE_MESSAGE:
            return {...state, messages: action.messages};

        default:
            return state;
    }
}

export default leaderReducer;