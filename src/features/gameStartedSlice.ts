import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface GameStartedSlice {
  value: boolean
}

const initialState: GameStartedSlice = {
  value: false
}

export const gameStartedSlice = createSlice({
  name: 'gameStarted',
  initialState,
  reducers: {
    setGameStartedTrue: (state) => {
      state.value = true
    }
  }
})

export const { setGameStartedTrue } = gameStartedSlice.actions

export const selectGameStarted = (state: RootState) => state.gameStarted.value

export default gameStartedSlice.reducer
