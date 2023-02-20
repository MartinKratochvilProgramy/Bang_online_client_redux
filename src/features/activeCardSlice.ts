import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type CardI } from '../types/card'

export interface ActiveCardSlice {
  value: CardI | null
}

const initialState: ActiveCardSlice = {
  value: null
}

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    setActiveCard: (state, action: PayloadAction<CardI | null>) => {
      state.value = action.payload
    }
  }
})

export const { setActiveCard } = activeCardSlice.actions

export const selectActiveCard = (state: RootState) => state.activeCard.value

export default activeCardSlice.reducer
