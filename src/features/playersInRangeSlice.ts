import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface PlayersInRangeSlice {
  value: string[]
}

const initialState: PlayersInRangeSlice = {
  value: []
}

export const playersInRangeSlice = createSlice({
  name: 'playersInRange',
  initialState,
  reducers: {
    setPlayersInRange: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload
    }
  }
})

export const { setPlayersInRange } = playersInRangeSlice.actions

export const selectPlayersInRange = (state: RootState) => state.playersInRange.value

export default playersInRangeSlice.reducer
