import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./slice/userSlice"
import listingReducer from "./slice/listingSlice"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const rootReducer = combineReducers({
  user: userReducer,
  listings: listingReducer,
})

const persistConfig = {
  key: "root",
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
