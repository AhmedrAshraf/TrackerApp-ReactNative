const INITIAL_STATES = {
    name: '',
    email: '',
    uid: '',
    loader: false,
}

export default function (state = INITIAL_STATES, action) {
    switch (action.type) {

        case 'START_LOADER':
            return ({
                ...state,
                loader: true,
            })

        case 'STOP_LOADER':
            return ({
                ...state,
                loader: false,
            })

        case 'SAVE_USER':
            return ({
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                uid: action.payload.uid,
            })

        default:
            return state;
    }
}