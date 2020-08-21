import * as actions from '../actions';

const initialState = {
    user: null,
    selectedConversation: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.USER_LOGGED: {
            return {
                ...state,
                user: action.user
            }
        }
        case actions.SELECT_CONVERSATION: {
            return {
                ...state,
                selectedConversation: action.data
            }
        }
    }

    return state;
}

export default reducer;
