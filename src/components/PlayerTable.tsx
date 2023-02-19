import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setCharacterUsableTrue } from '../features/characterUsableSlice'
import { selectCurrentRoom } from '../features/currentRoomSlice'
import { setDeckActiveTrue } from '../features/deckActiveSlice'
import { selectUsername } from '../features/usernameSlice'

import { socket } from '../socket'
import { setSelectPlayerTargetTrue } from './selectPlayerTargetSlice'

export const PlayerTable = () => {
  const username = useAppSelector(selectUsername)
  const currentRoom = useAppSelector(selectCurrentRoom)
  const character = useAppSelector(selectUsername)

  const dispatch = useAppDispatch()

  useEffect(() => {
    socket.on('update_draw_choices', (characterName) => {
      if (username === '') return
      if (currentRoom === null) return
      if (characterName === character) {
        if (characterName === 'Jesse Jones') {
          dispatch(setSelectPlayerTargetTrue())
          dispatch(setDeckActiveTrue())
          socket.emit('request_players_in_range', { range: 'max', currentRoom, username })
        } else if (characterName === 'Pedro Ramirez') {
          dispatch(setDeckActiveTrue())
          dispatch(setCharacterUsableTrue())
        } else {
          socket.emit('get_my_draw_choice', { username, currentRoom, character })
        }
      }
    })

    return () => {
      socket.off('update_draw_choices')
    }
  }, [])

  return (
    <div>PlayerTable</div>
  )
}
