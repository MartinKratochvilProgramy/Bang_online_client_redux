import React from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectUsername } from '../features/usernameSlice'
import { selectCurrentRoom } from '../features/currentRoomSlice'
import { selectCharacter, setCharacter } from '../features/characterSlice'
import { selectPlayerCharacterChoice } from '../features/playerCharacterChoice'

import { socket } from '../socket'

export const CharacterChoice = () => {
  const username = useAppSelector(selectUsername)
  const currentRoom = useAppSelector(selectCurrentRoom)
  const character = useAppSelector(selectCharacter)
  const playerCharacterChoice = useAppSelector(selectPlayerCharacterChoice)

  const dispatch = useAppDispatch()

  function chooseCharacter (characterChoice: string) {
    dispatch(setCharacter(characterChoice))
    socket.emit('character_choice', { username, currentRoom, character: characterChoice })
  }

  return (
    <div>
      <div className='text-3xl xs:text-6xl font-rye my-6 text-white'>
        {character === '' ? 'Pick a character' : 'Waiting for other players...'}
      </div>
      <div className='flex justify-center space-x-4'>
        {playerCharacterChoice.map((characterChoice: string) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const characterSource = require(`../img/gfx/characters/${characterChoice.replace(/\s/g, '')}.png`)
          let styles
          if (characterChoice === character) {
            styles = { border: 'solid 2px red' }
          }
          return (
            <img
              className='w-[185px] xs:w-[260px] rounded-3xl hover:shadow-2xl cursor-pointer'
              src={characterSource}
              key={characterChoice}
              style={styles}
              alt="deck card"
              onClick={() => { chooseCharacter(characterChoice) }}
            />
          )
        })}
      </div>
    </div>
  )
}
