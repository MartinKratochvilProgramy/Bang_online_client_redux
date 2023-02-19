import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface IndianiActiveState {
  value: boolean
}

const initialState: IndianiActiveState = {
  value: false
}

export const indianiActiveSlice = createSlice({
  name: 'indianiActive',
  initialState,
  reducers: {
    setIndianiActiveTrue: (state) => {
      state.value = true
    },
    setIndianiActiveFalse: (state) => {
      state.value = false
    }
  }
})

export const { setIndianiActiveTrue, setIndianiActiveFalse } = indianiActiveSlice.actions

export const selectIndianiActive = (state: RootState) => state.indianiActive.value

export default indianiActiveSlice.reducer
