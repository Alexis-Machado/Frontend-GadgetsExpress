import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload
        }
    },
})

// Las creadoras de acciones se generan para cada función reductora de casos
export const { setUserDetails } = userSlice.actions

export default userSlice.reducer