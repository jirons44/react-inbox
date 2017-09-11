import { combineReducers } from 'redux';

import messageReducer from './messageReducer';
import toolbarReducer from './toolbarReducers';

const rootReducer =  combineReducers({
    message: messageReducer,
    toolbarActions: toolbarReducer,
});

export default rootReducer;