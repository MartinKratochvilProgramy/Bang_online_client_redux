import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type Message } from '../types/message'

export interface MessagesSlice {
  value: Message[]
}

const initialState: MessagesSlice = {
  value: []
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.value = action.payload
    }
  }
})

export const { setMessages } = messagesSlice.actions

export const selectMessages = (state: RootState) => state.messages.value

export default messagesSlice.reducer
