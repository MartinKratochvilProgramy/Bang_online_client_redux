import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type CardI } from '../types/card'

export interface MyHandSlice {
  value: CardI[]
}

const initialState: MyHandSlice = {
  value: []
}

export const myHandSlice = createSlice({
  name: 'myHand',
  initialState,
  reducers: {
    setMyHand: (state, action: PayloadAction<CardI[]>) => {
      state.value = action.payload
    },
    setMyHandNotPlayable: (state) => {
      const newMyHand = [...state.value]

      for (let i = 0; i < newMyHand.length; i++) {
        const card = newMyHand[i]
        card.isPlayable = false
      }

      state.value = newMyHand
    },
    setMyHandPlayable: (state) => {
      const newMyHand = [...state.value]

      for (let i = 0; i < newMyHand.length; i++) {
        const card = newMyHand[i]
        card.isPlayable = true
      }

      state.value = newMyHand
    }
  }
})

export const { setMyHand, setMyHandNotPlayable, setMyHandPlayable } = myHandSlice.actions

export const selectMyHand = (state: RootState) => state.myHand.value

export default myHandSlice.reducer
