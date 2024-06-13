import {configureStore, combineReducers} from "@reduxjs/toolkit"
import userReducer from './slices/user-slice'

const rootReducers=combineReducers({
    user: userReducer,
})

export const store=configureStore({
    reducer: rootReducers
})