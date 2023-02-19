import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface MyHealthSlice {
  value: number
}

const initialState: MyHealthSlice = {
  value: 0
}

export const myHealthSlice = createSlice({
  name: 'myHealth',
  initialState,
  reducers: {
    setMyHealth: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    }
  }
})

export const { setMyHealth } = myHealthSlice.actions

export const selectMyHealth = (state: RootState) => state.myHealth.value

export default myHealthSlice.reducer
