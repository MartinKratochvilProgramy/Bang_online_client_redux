import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type Player } from '../types/player'

export interface PlayersState {
  value: Player[]
}

const initialState: PlayersState = {
  value: []
}

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<[]>) => {
      state.value = action.payload
    }
  }
})

export const { setPlayers } = playersSlice.actions

export const selectPlayers = (state: RootState) => state.players.value

export default playersSlice.reducer
