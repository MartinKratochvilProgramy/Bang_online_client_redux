import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface DeckActiveSlice {
  value: boolean
}

const initialState: DeckActiveSlice = {
  value: false
}

export const deckActiveSlice = createSlice({
  name: 'deckActive',
  initialState,
  reducers: {
    setDeckActiveTrue: (state) => {
      state.value = true
    },
    setDeckActiveFalse: (state) => {
      state.value = false
    }
  }
})

export const { setDeckActiveTrue, setDeckActiveFalse } = deckActiveSlice.actions

export const selectDeckActive = (state: RootState) => state.deckActive.value

export default deckActiveSlice.reducer
