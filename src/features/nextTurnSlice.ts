import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface NextTurnSlice {
  value: boolean
}

const initialState: NextTurnSlice = {
  value: true
}

export const nextTurnSlice = createSlice({
  name: 'nextTurn',
  initialState,
  reducers: {
    setNextTurnTrue: (state) => {
      state.value = true
    },
    setNextTurnFalse: (state) => {
      state.value = false
    }
  }
})

export const { setNextTurnTrue, setNextTurnFalse } = nextTurnSlice.actions

export const selectNextTurn = (state: RootState) => state.nextTurn.value

export default nextTurnSlice.reducer
