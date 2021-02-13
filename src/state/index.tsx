import { createAction, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import application from '../state/reducer'
import { save, load } from 'redux-localstorage-simple'

// fired once when the app reloads but before the app renders
// allows any updates to be applied to store data loaded from localStorage
export const updateVersion = createAction<void>('global/updateVersion')

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists']

const store = configureStore({
  reducer: {
    application,
    // user,
    // transactions,
    // swap,
    // mint,
    // burn,
    // multicall,
    // lists
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), save({ states: PERSISTED_KEYS })],
  preloadedState: load({ states: PERSISTED_KEYS })
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch