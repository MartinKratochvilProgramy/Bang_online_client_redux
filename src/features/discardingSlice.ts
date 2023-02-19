import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface DiscardingSlice {
  value: boolean
}

const initialState: DiscardingSlice = {
  value: false
}

export const discardingSlice = createSlice({
  name: 'discarding',
  initialState,
  reducers: {
    setDiscardingTrue: (state) => {
      state.value = true
    },
    setDiscardingFalse: (state) => {
      state.value = false
    }
  }
})

export const { setDiscardingTrue, setDiscardingFalse } = discardingSlice.actions

export const selectDiscarding = (state: RootState) => state.discarding.value

export default discardingSlice.reducer
