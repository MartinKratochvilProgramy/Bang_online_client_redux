import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type Card } from '../types/card'

export interface MyHandSlice {
  value: Card[]
}

const initialState: MyHandSlice = {
  value: []
}

export const myHandSlice = createSlice({
  name: 'myHand',
  initialState,
  reducers: {
    setMyHand: (state, action: PayloadAction<Card[]>) => {
      state.value = action.payload
    }
  }
})

export const { setMyHand } = myHandSlice.actions

export const selectMyHand = (state: RootState) => state.myHand.value

export default myHandSlice.reducer
