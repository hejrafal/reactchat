import * as actions from '../actions';

const initialState = {
    user: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.USER_LOGGED: {
            return {
                ...state,
                user: action.user
            }
        }
    }

    return state;
}

export default reducer;
