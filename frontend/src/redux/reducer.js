import { ALL_NOTES, CLEAN_DETAIL, DETAIL_NOTE, LOGIN_USER, LOGOUT_USER } from "./actionTypes";


const initialState = {
    access_token: [],
    userId: [],
    allNotes: [],
    allNotesArchived: [],
    allTags: [],
    allNotesCopy: [],
    detailNote: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_USER:
            return {
                ...state,
                access_token: payload.token,
                userId: payload.userId
            }
        case ALL_NOTES:
            const notes = payload.activeNotes.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
            const notesArchived = payload.archivedNotes.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
            const copyNotes = [...notes, ...notesArchived]
            return {
                ...state,
                allNotes: notes,
                allNotesCopy: notes,
                allNotesArchived: notesArchived,
                allNotesCopyArchived: notesArchived,
                allTags: Array.from(new Set(copyNotes.flatMap(note => note.tags || [])))
            }
        case LOGOUT_USER:
            return {
                ...state,
                userId: payload,
                access_token: payload
            }
        case DETAIL_NOTE:
            return {
                ...state,
                detailNote: payload
            }
        case CLEAN_DETAIL:
            return {
                ...state,
                detailNote: payload
            }
        default:
            return { ...state }
    }
}

export default reducer;