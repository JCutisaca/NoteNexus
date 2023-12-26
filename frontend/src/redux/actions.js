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

export const getAllNotesByUserId = (userId, access_token) => {
    return async (dispath) => {
        try {
            const config = {
                headers: {
                    authorization: `Bearer ${access_token}`
                }
            }
            const { data } = await axios(`/note/user/${userId}`, config)
            return dispath({ type: ALL_NOTES, payload: data })
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export const postNote = async (form, access_token) => {
    try {
        const config = {
            headers: {
                authorization: `Bearer ${access_token}`
            }
        }
        const { data } = await axios.post('/note/create', form, config)
        if (data.message) {
            return data.message;
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateNote = async (form, access_token) => {
    try {
        const config = {
            headers: {
                authorization: `Bearer ${access_token}`
            }
        }
        const { data } = await axios.put('/note/update', form, config)
        if (data.message) {
            return data.message;
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteNote = async (userId, id, access_token) => {
    try {
        const config = {
            headers: {
                authorization: `Bearer ${access_token}`
            }
        }
        const { data } = await axios.delete(`/note/delete/${userId}/${id}`, config)
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

export const getDetailNote = (userId, id, access_token) => {
    return async (dispath) => {
        try {
            const config = {
                headers: {
                    authorization: `Bearer ${access_token}`
                }
            }
            const { data } = await axios(`/note/${userId}/${id}`, config)
            return dispath({ type: DETAIL_NOTE, payload: data })
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export const cleanDetail = (id) => {
    return { type: CLEAN_DETAIL, payload: [] }
}