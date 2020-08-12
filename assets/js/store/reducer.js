const initialState = {
    messages: []
}

const reducer = (state = initialState, action) => {

    console.log(action);
    switch (action.type) {
        case 'MESSAGE_ADD': {
            return {
                ...state,
                messages: state.messages.concat(action.message)
            }
        }
    }

    return state;
}

export default reducer;