import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface AdminState {
  value: boolean
}

const initialState: AdminState = {
  value: false
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminTrue: (state) => {
      state.value = true
    }
  }
})

export const { setAdminTrue } = adminSlice.actions

export const selectAdmin = (state: RootState) => state.admin.value

export default adminSlice.reducer
