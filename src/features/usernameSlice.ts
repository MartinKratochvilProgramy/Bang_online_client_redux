import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface UsernameState {
  value: string | null
}

const initialState: UsernameState = {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
  value: parseLocalStorage()
}

export const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})

export const { setUsername } = usernameSlice.actions

export const selectUsername = (state: RootState) => state.username.value

export default usernameSlice.reducer

function parseLocalStorage () {
  const value = localStorage.getItem('username')

  if (typeof value === 'string') {
    const parse = JSON.parse(value) // ok
    return parse
  } else {
    return ''
  }
}
