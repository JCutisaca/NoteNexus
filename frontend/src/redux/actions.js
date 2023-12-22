import axios from "axios";
import { LOGIN_USER } from "./actionTypes";


export const postUser = async (form) => {
    try {
        const { data } = await axios.post('/user/create', form)
        if (data.message) {
            return data.message;
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

export const loginUser = (form) => {
    return async (dispath) => {
        try {
            const { data } = await axios.post('/user/login', form)
            if (data.userId) {
                return dispath({ type: LOGIN_USER, payload: data })
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
}