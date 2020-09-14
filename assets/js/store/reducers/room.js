import * as actions from '../actions';

const initialState = {
    rooms: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.SET_ROOMS: {
            return {
                ...state,
                rooms: action.rooms
            }
        }
    }

    return state;
}

export default reducer;
