import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface SelectPlayerTargetSlice {
  value: boolean
}

const initialState: SelectPlayerTargetSlice = {
  value: true
}

export const selectPlayerTarget = createSlice({
  name: 'selectPlayerTarget',
  initialState,
  reducers: {
    setSelectPlayerTargetTrue: (state) => {
      state.value = true
    },
    setSelectPlayerTargetFalse: (state) => {
      state.value = false
    }
  }
})

export const { setSelectPlayerTargetTrue, setSelectPlayerTargetFalse } = selectPlayerTarget.actions

export const selectSelectPlayerTarget = (state: RootState) => state.selectPlayerTarget.value

export default selectPlayerTarget.reducer
