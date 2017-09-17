import * as types from '../actions/actionTypes';
import { getAllIds, getByIds, toggleSelectedMessage, doesLabelExist } from '../utilities/messagesHelper';

// configureStore already set up state globally..do i need here...probably not
const initialState = {
    allIds: [],
    byIds: []
}

function messageReducer(state = initialState , action) {

    let byIds = {};
    let allIds = [];
    let message = {};

    switch(action.type) {
        case types.LOAD_MESSAGES:
            return {
                ...state,
                allIds: getAllIds(action.messages),
                byIds: getByIds(action.messages),
            };

        case types.TOGGLE_MESSAGE_SELECTED:
            byIds = {...state.byIds}
            byIds[action.id] = toggleSelectedMessage(byIds[action.id]);

            return {...state, byIds};

        case types.DELETE_MESSAGES:
            allIds = state.allIds.filter(id => !action.ids.includes(id));
            byIds = {...state.byIds};
            action.ids.forEach(id => delete byIds[id] );

            return {...state, byIds, allIds};

        case types.UPDATE_STARRED_MESSAGE:
            byIds = {...state.byIds}
            byIds[action.id] = {...byIds[action.id], starred: action.starred}

            return {...state, byIds};

        case types.BULK_MESSAGE_SELECTED:
            byIds = {...state.byIds}
            state.allIds.forEach(id => {
                if (byIds[id].selected !== action.selected) {
                    byIds[id] = {...byIds[id], selected: action.selected};
                }
            });

            return {...state, byIds};

        case types.UPDATE_READ_MESSAGES:
            byIds = {...state.byIds}
            action.ids.forEach(id => {
                 byIds[id] = {...byIds[id], read: action.read};
            });

            return {...state, byIds};

        case types.ADD_LABELS:
            byIds = {...state.byIds};

            action.ids.forEach(id => {
                message = {...byIds[id]}

                if (!doesLabelExist(message, action.label) ) {
                    byIds[id] = {
                        ...message,
                        labels: [...message.labels, action.label]
                    };
                }
            });

            return {...state, byIds};

        case types.REMOVE_LABELS:
            byIds = {...state.byIds};

            action.ids.forEach(id => {
                message = {...byIds[id]};

                if (doesLabelExist(message, action.label)) {
                    byIds[id] = {
                        ...message,
                        labels: message.labels.filter(label => label !== action.label)
                    };
                }
            });

            return {...state, byIds};


        case types.CREATE_MESSAGE:
            allIds = [...state.allIds, action.message.id];
            byIds = {...state.byIds};
            byIds[action.message.id] = action.message;

            return {...state, byIds, allIds};

        default:
            return state;
    }
}

export default messageReducer;
