import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  token: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setTripList: (state, action) => {
      state.user.tripList = action.payload
    },
  },
})

export const { setLogin, setTripList } = userSlice.actions

export default userSlice.reducer
