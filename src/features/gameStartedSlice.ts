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
    },
    setGameStartedFalse: (state) => {
      state.value = false
    }
  }
})

export const { setGameStartedTrue, setGameStartedFalse } = gameStartedSlice.actions

export const selectGameStarted = (state: RootState) => state.gameStarted.value

export default gameStartedSlice.reducer
