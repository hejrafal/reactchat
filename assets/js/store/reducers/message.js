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
    }

    return state;
}

export default reducer;
