import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface CharacterUsableSlice {
  value: boolean
}

const initialState: CharacterUsableSlice = {
  value: false
}

export const characterUsableSlice = createSlice({
  name: 'characterUsable',
  initialState,
  reducers: {
    setCharacterUsableTrue: (state) => {
      state.value = true
    },
    setCharacterUsableFalse: (state) => {
      state.value = false
    }
  }
})

export const { setCharacterUsableTrue, setCharacterUsableFalse } = characterUsableSlice.actions

export const selectCharacterUsable = (state: RootState) => state.characterUsable.value

export default characterUsableSlice.reducer
