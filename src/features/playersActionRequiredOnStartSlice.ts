import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type PlayerActionRequiredOnStart } from '../types/playerActionRequiredOnStart'

export interface PlayersActionRequiredOnStartSlice {
  value: PlayerActionRequiredOnStart[]
}

const initialState: PlayersActionRequiredOnStartSlice = {
  value: []
}

export const playersActionRequiredOnStartSlice = createSlice({
  name: 'playersActionRequiredOnStart',
  initialState,
  reducers: {
    setPlayersActionRequiredOnStart: (state, action: PayloadAction<PlayerActionRequiredOnStart[]>) => {
      state.value = action.payload
    }
  }
})

export const { setPlayersActionRequiredOnStart } = playersActionRequiredOnStartSlice.actions

export const selectPlayersActionRequiredOnStart = (state: RootState) => state.playersActionRequiredOnStart.value

export default playersActionRequiredOnStartSlice.reducer
