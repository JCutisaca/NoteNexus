import { LOGIN_USER } from "./actionTypes";


const initialState = {
    access_token: [],
    userId: [],
    notes: [],
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_USER:
            return {
                ...state,
                access_token: payload.token,
                userId: payload.userId
            }
        default:
            return { ...state }
    }
}

export default reducer;