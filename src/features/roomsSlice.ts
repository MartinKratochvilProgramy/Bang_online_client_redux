import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type Room } from '../types/room'

export interface RoomsState {
  value: Room[]
}

const initialState: RoomsState = {
  value: []
}

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.value = action.payload
    }
  }
})

export const { setRooms } = roomsSlice.actions

export const selectRooms = (state: RootState) => state.rooms.value

export default roomsSlice.reducer
