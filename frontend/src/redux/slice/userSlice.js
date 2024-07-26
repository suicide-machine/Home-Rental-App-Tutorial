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

    setLogout: (state) => {
      state.user = null
      state.token = null
    },

    setTripList: (state, action) => {
      state.user.tripList = action.payload
    },

    setWishList: (state, action) => {
      state.user.wishList = action.payload
    },
  },
})

export const { setLogin, setTripList, setLogout, setWishList } =
  userSlice.actions

export default userSlice.reducer
