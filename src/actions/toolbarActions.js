// markRead UnRead action
// apply label
// remove label
// delete message
// check uncheck all

import { TOGGEL_COMPOSED_FORM } from './actionTypes'

export function toggleComposedForm() {
    return (dispatch) => {
        dispatch({
            type: TOGGEL_COMPOSED_FORM
        })
    }
}