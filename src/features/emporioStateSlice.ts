import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type Card } from '../types/card'

export interface EmporioStateSlice {
  value: Card[]
}

const initialState: EmporioStateSlice = {
  value: []
}

export const emporioStateSlice = createSlice({
  name: 'emporioState',
  initialState,
  reducers: {
    setEmporioState: (state, action: PayloadAction<Card[]>) => {
      state.value = action.payload
    }
  }
})

export const { setEmporioState } = emporioStateSlice.actions

export const selectEmporioState = (state: RootState) => state.emporioState.value

export default emporioStateSlice.reducer
