import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface CharacterChoiceInProgress {
  value: boolean
}

const initialState: CharacterChoiceInProgress = {
  value: false
}

export const characterChoiceInProgress = createSlice({
  name: 'characterChoiceInProgress',
  initialState,
  reducers: {
    setCharacterChoiceInProgressTrue: (state) => {
      state.value = true
    },
    setCharacterChoiceInProgressFalse: (state) => {
      state.value = false
    }
  }
})

export const { setCharacterChoiceInProgressTrue, setCharacterChoiceInProgressFalse } = characterChoiceInProgress.actions

export const selectCharacterChoiceInProgress = (state: RootState) => state.characterChoiceInProgress.value

export default characterChoiceInProgress.reducer
