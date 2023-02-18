import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit'
import usernameReducer from '../features/usernameSlice'
import isAdminReducer from '../features/isAdminSlice'
import roomsReducer from '../features/roomsSlice'
import currentRoomReducer from '../features/currentRoomSlice'
import gameStartedReducer from '../features/gameStartedSlice'
import playersReducer from '../features/playersSlice'
import messagesSlice from '../features/messagesSlice'
import playerCharacterChoiceSlice from '../features/playerCharacterChoice'
import characterChoiceInProgressSlice from '../features/characterChoiceInProgressSlice'
import characterSlice from '../features/characterSlice'
import allPlayersInfoSlice from '../features/allPlayersInfoSlice'
import allCharactersInfoSlice from '../features/allCharactersInfoSlice'

export const store = configureStore({
  reducer: {
    username: usernameReducer,
    isAdmin: isAdminReducer,
    rooms: roomsReducer,
    currentRoom: currentRoomReducer,
    gameStarted: gameStartedReducer,
    players: playersReducer,
    messages: messagesSlice,
    playerCharacterChoice: playerCharacterChoiceSlice,
    characterChoiceInProgress: characterChoiceInProgressSlice,
    character: characterSlice,
    allPlayersInfo: allPlayersInfoSlice,
    allCharactersInfo: allCharactersInfoSlice
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
