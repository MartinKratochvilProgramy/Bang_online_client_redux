import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface SelectCardTargetSlice {
  value: boolean
}

const initialState: SelectCardTargetSlice = {
  value: false
}

export const selectCardTarget = createSlice({
  name: 'selectCardTarget',
  initialState,
  reducers: {
    setSelectCardTargetTrue: (state) => {
      state.value = true
    },
    setSelectCardTargetFalse: (state) => {
      state.value = false
    }
  }
})

export const { setSelectCardTargetTrue, setSelectCardTargetFalse } = selectCardTarget.actions

export const selectSelectCardTarget = (state: RootState) => state.selectCardTarget.value

export default selectCardTarget.reducer
