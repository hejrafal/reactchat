import * as actions from '../actions';

const initialState = {
    users: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.USER_LIST: {
            return {
                ...state,
                users: action.users
            }
        }
    }

    return state;
}

export default reducer;
