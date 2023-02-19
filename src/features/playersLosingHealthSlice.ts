import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type PlayerLosingHealth } from '../types/playersLosingHealth'

export interface PlayersLosingHealthSlice {
  value: PlayerLosingHealth[]
}

const initialState: PlayersLosingHealthSlice = {
  value: []
}

export const playersLosingHealthSlice = createSlice({
  name: 'playersLosingHealth',
  initialState,
  reducers: {
    setPlayersLosingHealth: (state, action: PayloadAction<PlayerLosingHealth[]>) => {
      state.value = action.payload
    }
  }
})

export const { setPlayersLosingHealth } = playersLosingHealthSlice.actions

export const selectPlayersLosingHealth = (state: RootState) => state.playersLosingHealth.value

export default playersLosingHealthSlice.reducer
