import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type Card } from '../types/card'

export interface TopStackCardSlice {
  value: Card | null
}

const initialState: TopStackCardSlice = {
  value: null
}

export const topStackCardSlice = createSlice({
  name: 'topStackCard',
  initialState,
  reducers: {
    setTopStackCard: (state, action: PayloadAction<Card>) => {
      state.value = action.payload
    }
  }
})

export const { setTopStackCard } = topStackCardSlice.actions

export const selectTopStackCard = (state: RootState) => state.topStackCard.value

export default topStackCardSlice.reducer
