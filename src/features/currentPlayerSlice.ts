import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface CurrentPlayerSlice {
  value: string
}

const initialState: CurrentPlayerSlice = {
  value: ''
}

export const currentPlayer = createSlice({
  name: 'currentPlayer',
  initialState,
  reducers: {
    setCurrentPlayer: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setCurrentPlayer } = currentPlayer.actions

export const selectCurrentPlayer = (state: RootState) => state.currentPlayer.value

export default currentPlayer.reducer
