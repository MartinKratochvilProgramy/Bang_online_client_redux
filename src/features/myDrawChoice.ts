import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type CardI } from '../types/card'

export interface MyDrawChoiceSlice {
  value: CardI[]
}

const initialState: MyDrawChoiceSlice = {
  value: []
}

export const myDrawChoiceSlice = createSlice({
  name: 'myDrawChoice',
  initialState,
  reducers: {
    setMyDrawChoice: (state, action: PayloadAction<CardI[]>) => {
      state.value = action.payload
    }
  }
})

export const { setMyDrawChoice } = myDrawChoiceSlice.actions

export const selectMyDrawChoice = (state: RootState) => state.myDrawChoice.value

export default myDrawChoiceSlice.reducer
