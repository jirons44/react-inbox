import { TOGGEL_COMPOSED_FORM } from './actionTypes'

export function toggleComposedForm() {
    return (dispatch) => {
        dispatch({
            type: TOGGEL_COMPOSED_FORM
        })
    }
}