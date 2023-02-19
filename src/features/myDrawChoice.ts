import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type Card } from '../types/card'

export interface MyDrawChoiceSlice {
  value: Card[]
}

const initialState: MyDrawChoiceSlice = {
  value: []
}

export const myDrawChoiceSlice = createSlice({
  name: 'myDrawChoice',
  initialState,
  reducers: {
    setMyDrawChoice: (state, action: PayloadAction<Card[]>) => {
      state.value = action.payload
    }
  }
})

export const { setMyDrawChoice } = myDrawChoiceSlice.actions

export const selectMyHand = (state: RootState) => state.myDrawChoice.value

export default myDrawChoiceSlice.reducer
