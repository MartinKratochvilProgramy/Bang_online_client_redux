import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface PlayerCharacterChoice {
  value: string[]
}

const initialState: PlayerCharacterChoice = {
  value: []
}

export const playerCharacterChoice = createSlice({
  name: 'playerCharacterChoice',
  initialState,
  reducers: {
    setPlayerCharacterChoice: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload
    }
  }
})

export const { setPlayerCharacterChoice } = playerCharacterChoice.actions

export const selectPlayerCharacterChoice = (state: RootState) => state.playerCharacterChoice.value

export default playerCharacterChoice.reducer
