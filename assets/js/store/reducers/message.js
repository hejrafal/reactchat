import * as actions from '../actions';

const initialState = {
    messages: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.MESSAGE_ADD: {
            return {
                ...state,
                messages: state.messages.concat(action.message)
            }
        }
        case actions.USER_MESSAGES: {
            return {
                ...state,
                messages: action.messages
            }
        }
        case actions.ROOM_MESSAGES: {
            return {
                ...state,
                messages: action.messages
            }
        }
    }

    return state;
}

export default reducer;
