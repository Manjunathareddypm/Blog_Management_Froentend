import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: '', isAuthenticated: '' }
const userAuthor1 = createSlice({
    name: 'user-initial-dates',
    initialState,
    reducers:
    {
        addTokenToSystem: (state, actions) => {
            state.token = actions.payload
        },
        setAuthenticated: (state, actions) => {
            state.isAuthenticated = actions.payload
        }

    }
})

export const { addTokenToSystem, setAuthenticated } = userAuthor1.actions
export default userAuthor1.reducer