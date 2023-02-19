import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface NextEmporioTurnSlice {
  value: string
}

const initialState: NextEmporioTurnSlice = {
  value: ''
}

export const nextEmporioTurnSlice = createSlice({
  name: 'nextEmporioTurn',
  initialState,
  reducers: {
    setNextEmporioTurn: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setNextEmporioTurn } = nextEmporioTurnSlice.actions

export const selectNextEmporioTurn = (state: RootState) => state.nextEmporioTurn.value

export default nextEmporioTurnSlice.reducer
