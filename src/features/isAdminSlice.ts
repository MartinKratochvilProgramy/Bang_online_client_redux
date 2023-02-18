import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface IsAdminState {
  value: boolean
}

const initialState: IsAdminState = {
  value: false
}

export const isAdminSlice = createSlice({
  name: 'isAdmin',
  initialState,
  reducers: {
    setIsAdminTrue: (state) => {
      state.value = true
    },
    setIsAdminFalse: (state) => {
      state.value = false
    }
  }
})

export const { setIsAdminTrue, setIsAdminFalse } = isAdminSlice.actions

export const selectIsAdmin = (state: RootState) => state.isAdmin.value

export default isAdminSlice.reducer
