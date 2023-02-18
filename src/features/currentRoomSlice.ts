import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

export interface CurrentRoomState {
  value: string | null
}

const initialState: CurrentRoomState = {
  value: null
}

export const currentRoomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setCurrentRoom: (state, action: PayloadAction<string | null>) => {
      state.value = action.payload
    }
  }
})

export const { setCurrentRoom } = currentRoomSlice.actions

export const selectCurrentRoom = (state: RootState) => state.currentRoom.value

export default currentRoomSlice.reducer
