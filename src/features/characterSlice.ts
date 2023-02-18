import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface CharacterSlice {
  value: string
}

const initialState: CharacterSlice = {
  value: ''
}

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacter: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setCharacter } = characterSlice.actions

export const selectCharacter = (state: RootState) => state.character.value

export default characterSlice.reducer
