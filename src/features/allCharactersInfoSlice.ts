import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface CharacterInfo {
  name: string
  character: string
}

export interface AllCharactersInfo {
  value: CharacterInfo[]
}

const initialState: AllCharactersInfo = {
  value: []
}

export const allCharactersInfo = createSlice({
  name: 'allCharactersInfo',
  initialState,
  reducers: {
    setAllCharactersInfo: (state, action: PayloadAction<CharacterInfo[]>) => {
      state.value = action.payload
    }
  }
})

export const { setAllCharactersInfo } = allCharactersInfo.actions

export const selectAllCharactersInfo = (state: RootState) => state.allCharactersInfo.value

export default allCharactersInfo.reducer
