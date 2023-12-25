import axios from "axios";
import { ALL_NOTES, CLEAN_DETAIL, DETAIL_NOTE, LOGIN_USER, LOGOUT_USER } from "./actionTypes";


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

export const getAllNotesByUserId = (userId) => {
    return async (dispath) => {
        try {
            const { data } = await axios(`/note/user/${userId}`)
            return dispath({ type: ALL_NOTES, payload: data })
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export const postNote = async (form) => {
    try {
        const { data } = await axios.post('/note/create', form)
        if (data.message) {
            return data.message;
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateNote = async (form) => {
    try {
        const { data } = await axios.put('/note/update', form)
        if (data.message) {
            return data.message;
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteNote = async (userId, id) => {
    try {
        const { data } = await axios.delete(`/note/delete/${userId}/${id}`)
        if (data.message) {
            return data.message;
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

export const logoutUser = () => {
    return { type: LOGOUT_USER, payload: [] }
}

export const getDetailNote = (userId, id) => {
    return async (dispath) => {
        try {
            const { data } = await axios(`/note/${userId}/${id}`)
            return dispath({ type: DETAIL_NOTE, payload: data })
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export const cleanDetail = (id) => {
    return { type: CLEAN_DETAIL, payload: [] }
}