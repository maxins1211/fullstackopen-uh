import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        createAnecdoteNoti(state, action) {
            return `You added "${action.payload}"`
        },
        voteAnecdoteNoti(state, action) {
            return `You voted "${action.payload}"`
        },
        removeNoti(state, action) {
            return ""
        }
    }
})

export const createNotification = (content, time) => {
    return async (dispatch) => {
        dispatch(createAnecdoteNoti(content))
        setTimeout(() => {
            dispatch(removeNoti())
        }, time)
    }
}
export const { createAnecdoteNoti, voteAnecdoteNoti, removeNoti } = notificationSlice.actions
export default notificationSlice.reducer