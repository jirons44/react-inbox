import * as types from '../actions/actionTypes';

const initialState = {
        toggleComposedForm: false,
}

function toolbarReducer(state = initialState, action) {
    switch(action.type) {
        case types.TOGGEL_COMPOSED_FORM:
            return {...state,
                toggleComposedForm: !state.toggleComposedForm
            };


        default:
            return state;
    }
}

export default toolbarReducer;