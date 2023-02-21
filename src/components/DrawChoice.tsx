import React from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectMyDrawChoice, setMyDrawChoice } from '../features/myDrawChoice'
import { type CardI } from '../types/card'

import { socket } from '../socket'
import { setCharacterUsableFalse } from '../features/characterUsableSlice'
import { selectCharacter } from '../features/characterSlice'
import { selectMyHand, setMyHand } from '../features/myHandSlice'
import { selectUsername } from '../features/usernameSlice'
import { selectCurrentRoom } from '../features/currentRoomSlice'

export const DrawChoice = () => {
  const myDrawChoice = useAppSelector(selectMyDrawChoice)
  const character = useAppSelector(selectCharacter)
  const myHand = useAppSelector(selectMyHand)
  const username = useAppSelector(selectUsername)
  const currentRoom = useAppSelector(selectCurrentRoom)

  const dispatch = useAppDispatch()

  if (myDrawChoice[0] === null) return (null) // ???

  function getChoiceCard (card: CardI) {
    dispatch(setCharacterUsableFalse())
    dispatch(setMyHand([...myHand, card]))

    if (character === 'Kit Carlson') {
      const newMyDrawChoice = [...myDrawChoice]
      newMyDrawChoice.splice(myDrawChoice.findIndex((foundCard: CardI) => (foundCard.name === card.name && foundCard.digit === card.digit && foundCard.type === card.type)))
      console.log(newMyDrawChoice)

      dispatch(setMyDrawChoice(newMyDrawChoice))

      socket.emit('get_choice_card_KC', { username, currentRoom, card })
    } else if (character === 'Lucky Duke') {
      dispatch(setMyDrawChoice([]))

      socket.emit('get_choice_card_LD', { username, currentRoom, card })
    }
  }

  return (
    <div
      id="draw-choice"
      className='flex flex-col justify-center w-[220px] xs:w-[350px] items-center bg-beige py-2 px-4 rounded'
    >
      <div className='text-black font-rye text-3xl'>
            Your draw choice:
      </div>
      <div className='flex space-x-2 xs:space-x-4'>
        {myDrawChoice.map((card: CardI, index) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const cardSource = require(`../img/gfx/cards/${card.name.replace(/!/, '').replace(/\s/, '').replace(/\./g, '')}.png`)
          return (
            <button
              onClick={() => { getChoiceCard(card) }}
              style={{ color: 'red', border: 'solid 2px red', cursor: 'pointer' }}
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
