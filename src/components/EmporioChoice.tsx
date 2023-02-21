import React from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectNextEmporioTurn } from '../features/nextEmporioTurnSlice'
import { selectUsername } from '../features/usernameSlice'
import { type CardI } from '../types/card'
import { selectCurrentRoom } from '../features/currentRoomSlice'
import { selectEmporioState, setEmporioState } from '../features/emporioStateSlice'
import { selectMyHand } from '../features/myHandSlice'

import { socket } from '../socket'

export const EmporioChoice = () => {
  const username = useAppSelector(selectUsername)
  const currentRoom = useAppSelector(selectCurrentRoom)
  const nextEmporioTurn = useAppSelector(selectNextEmporioTurn)
  const myHand = useAppSelector(selectMyHand)
  const emporioState = useAppSelector(selectEmporioState)

  const dispatch = useAppDispatch()

  let emporioStyles = {}
  if (nextEmporioTurn === username) {
    emporioStyles = { color: 'black', border: 'solid 2px red' }
  } else {
    emporioStyles = { color: 'black' }
  }

  function getEmporioCard (card: CardI) {
    if (username !== nextEmporioTurn) return
    socket.emit('get_emporio_card', { username, currentRoom, card })

    const newEmporioState = [...emporioState]
    const cardIndex = myHand.findIndex(foundCard => (foundCard.name === card.name && foundCard.digit === card.digit && foundCard.type === card.type))
    newEmporioState.splice(cardIndex, 1)
    dispatch(setEmporioState(newEmporioState))
  }

  return (
    <div
      id="draw-choice"
      className='flex flex-col justify-center items-center bg-beige py-2 px-4 rounded'
    >
      <div className='text-black font-rye text-3xl'>
            Emporio:
      </div>
      <div className='flex space-x-2 xs:space-x-4'>
        {emporioState.map((card: CardI, index) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const cardSource = require(`../img/gfx/cards/${card.name.replace(/!/, '').replace(/\s/, '').replace(/\./g, '')}.png`)
          return (
            <button
              onClick={() => { getEmporioCard(card) }}
              style={emporioStyles}
              className='w-[60px] xs:w-[80px] rounded-md'
              key={index}
            >
              <img src={cardSource} alt="" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
