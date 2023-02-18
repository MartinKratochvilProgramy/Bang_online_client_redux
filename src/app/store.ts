import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit'
import usernameReducer from '../features/usernameSlice'
import adminReducer from '../features/adminSlice'
import roomsReducer from '../features/roomsSlice'
import currentRoomReducer from '../features/currentRoomSlice'
import gameStartedReducer from '../features/gameStartedSlice'

export const store = configureStore({
  reducer: {
    username: usernameReducer,
    admin: adminReducer,
    rooms: roomsReducer,
    currentRoom: currentRoomReducer,
    gameStarted: gameStartedReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>
