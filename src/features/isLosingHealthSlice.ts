import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface IsLosingHealthState {
  value: boolean
}

const initialState: IsLosingHealthState = {
  value: false
}

export const isLosingHealthSlice = createSlice({
  name: 'isLosingHealth',
  initialState,
  reducers: {
    setIsLosingHealthTrue: (state) => {
      state.value = true
    },
    setIsLosingHealthFalse: (state) => {
      state.value = false
    }
  }
})

export const { setIsLosingHealthTrue, setIsLosingHealthFalse } = isLosingHealthSlice.actions

export const selectIsLosingHealth = (state: RootState) => state.isLosingHealth.value

export default isLosingHealthSlice.reducer
