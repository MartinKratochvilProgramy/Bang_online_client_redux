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
import knownRolesSlice from '../features/knownRolesSlice'
import myHandSlice from '../features/myHandSlice'
import myDrawChoiceSlice from '../features/myDrawChoice'
import nextEmporioTurnSlice from '../features/nextEmporioTurnSlice'
import emporioStateSlice from '../features/emporioStateSlice'
import nextTurnSlice from '../features/nextTurnSlice'
import playersLosingHealthSlice from '../features/playersLosingHealthSlice'
import myHealthSlice from '../features/myHealthSlice'
import characterUsableSlice from '../features/characterUsableSlice'
import playersInRangeSlice from '../features/playersInRangeSlice'
import currentPlayerSlice from '../features/currentPlayerSlice'
import playersActionRequiredOnStartSlice from '../features/playersActionRequiredOnStartSlice'
import duelActiveSlice from '../features/duelActiveSlice'
import indianiActiveSlice from '../features/indianiActiveSlice'
import topStackCardSlice from '../features/topStackCardSlice'
import selectPlayerTargetSlice from '../features/selectPlayerTargetSlice'
import deckActiveSlice from '../features/deckActiveSlice'
import discardingSlice from '../features/discardingSlice'
import isLosingHealthSlice from '../features/isLosingHealthSlice'
import selectCardTargetSlice from '../features/selectCardTargetSlice'
import activeCardSlice from '../features/activeCardSlice'
import winnerSlice from '../features/winnerSlice'

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
    allCharactersInfo: allCharactersInfoSlice,
    knownRoles: knownRolesSlice,
    myHand: myHandSlice,
    myDrawChoice: myDrawChoiceSlice,
    nextEmporioTurn: nextEmporioTurnSlice,
    emporioState: emporioStateSlice,
    nextTurn: nextTurnSlice,
    playersLosingHealth: playersLosingHealthSlice,
    myHealth: myHealthSlice,
    characterUsable: characterUsableSlice,
    playersInRange: playersInRangeSlice,
    currentPlayer: currentPlayerSlice,
    playersActionRequiredOnStart: playersActionRequiredOnStartSlice,
    duelActive: duelActiveSlice,
    indianiActive: indianiActiveSlice,
    topStackCard: topStackCardSlice,
    selectPlayerTarget: selectPlayerTargetSlice,
    deckActive: deckActiveSlice,
    discarding: discardingSlice,
    isLosingHealth: isLosingHealthSlice,
    selectCardTarget: selectCardTargetSlice,
    activeCard: activeCardSlice,
    winner: winnerSlice
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
