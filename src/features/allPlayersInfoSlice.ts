import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type CardI } from '../types/card'

export interface PlayerInfo {
  name: string
  numberOfCards: number
  health: number
  table: CardI[]
}

export interface AllPlayersInfo {
  value: PlayerInfo[]
}

const initialState: AllPlayersInfo = {
  value: []
}

export const allPlayersInfo = createSlice({
  name: 'allPlayersInfo',
  initialState,
  reducers: {
    setAllPlayersInfo: (state, action: PayloadAction<PlayerInfo[]>) => {
      state.value = action.payload
    }
  }
})

export const { setAllPlayersInfo } = allPlayersInfo.actions

export const selectAllPlayersInfo = (state: RootState) => state.allPlayersInfo.value

export default allPlayersInfo.reducer
