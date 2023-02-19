import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type KnownRoles } from '../types/knownRoles'

const initialState = {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  value: {} as KnownRoles
}

export const knownRoles = createSlice({
  name: 'knownRoles',
  initialState,
  reducers: {
    setKnownRoles: (state, action: PayloadAction<KnownRoles>) => {
      state.value = action.payload
    }
  }
})

export const { setKnownRoles } = knownRoles.actions

export const selectKnownRoles = (state: RootState) => state.knownRoles.value

export default knownRoles.reducer
