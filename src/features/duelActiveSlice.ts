import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface DuelActiveState {
  value: boolean
}

const initialState: DuelActiveState = {
  value: false
}

export const duelActiveSlice = createSlice({
  name: 'duelActive',
  initialState,
  reducers: {
    setDuelActiveTrue: (state) => {
      state.value = true
    },
    setDuelActiveFalse: (state) => {
      state.value = false
    }
  }
})

export const { setDuelActiveTrue, setDuelActiveFalse } = duelActiveSlice.actions

export const selectDuelActive = (state: RootState) => state.duelActive.value

export default duelActiveSlice.reducer
