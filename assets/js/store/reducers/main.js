import * as actions from '../actions';

const initialState = {
    user: null,
    selectedUserOrRoom: null,
    selectedConversation: null,
    messagesRef: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.USER_LOGGED: {
            return {
                ...state,
                user: action.user
            }
        }
        case actions.SELECT_USER_OR_ROOM: {
            return {
                ...state,
                selectedUserOrRoom: action.userOrRoom
            }
        }
        case actions.SELECT_CONVERSATION: {
            return {
                ...state,
                selectedConversation: action.conversation
            }
        }
        case actions.SET_MESSAGES_REF: {
            return {
                ...state,
                messagesRef: action.messagesRef
            }
        }
    }

    return state;
}

export default reducer;
