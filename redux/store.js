import { configureStore } from '@reduxjs/toolkit'
import user from './Slices/user'


export const store = configureStore({
    reducer: {
        user

    },
})
