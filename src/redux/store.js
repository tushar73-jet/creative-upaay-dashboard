import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice'
import { loadState, saveState } from './localStorage'

const preloadedState = loadState()

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState
})

store.subscribe(() => {
  saveState({
    tasks: store.getState().tasks
  })
})
