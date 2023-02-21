import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface WinnerState {
  value: string | null
}

const initialState: WinnerState = {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
  value: null
}

export const winnerSlice = createSlice({
  name: 'winner',
  initialState,
  reducers: {
    setWinner: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setWinner } = winnerSlice.actions

export const selectWinner = (state: RootState) => state.winner.value

export default winnerSlice.reducer
