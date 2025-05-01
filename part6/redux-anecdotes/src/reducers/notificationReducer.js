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
        }
    }
})
export const { createAnecdoteNoti, voteAnecdoteNoti } = notificationSlice.actions
export default notificationSlice.reducer