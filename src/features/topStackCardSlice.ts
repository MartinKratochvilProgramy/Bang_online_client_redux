import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type CardI } from '../types/card'

export interface TopStackCardSlice {
  value: CardI | null
}

const initialState: TopStackCardSlice = {
  value: null
}

export const topStackCardSlice = createSlice({
  name: 'topStackCard',
  initialState,
  reducers: {
    setTopStackCard: (state, action: PayloadAction<CardI>) => {
      state.value = action.payload
    },
    setTopStackCardNotActive: (state) => {
      const newTopStackCard = state.value
      if (newTopStackCard === null) return
      newTopStackCard.isPlayable = false

      state.value = newTopStackCard
    }
  }
})

export const { setTopStackCard, setTopStackCardNotActive } = topStackCardSlice.actions

export const selectTopStackCard = (state: RootState) => state.topStackCard.value

export default topStackCardSlice.reducer
