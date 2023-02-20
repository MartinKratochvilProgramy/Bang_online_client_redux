import React from 'react'
import { Card } from './Card'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectDeckActive, setDeckActiveFalse } from '../features/deckActiveSlice'
import { selectCurrentRoom } from '../features/currentRoomSlice'
import { selectUsername } from '../features/usernameSlice'

import { socket } from '../socket'
import { setCharacterUsableFalse } from '../features/characterUsableSlice'
import { setSelectPlayerTargetFalse } from '../features/selectPlayerTargetSlice'
import { setNextTurnTrue } from '../features/nextTurnSlice'
import { selectTopStackCard } from '../features/topStackCardSlice'

export const StackDeck = () => {
  const username = useAppSelector(selectUsername)
  const currentRoom = useAppSelector(selectCurrentRoom)
  const deckActive = useAppSelector(selectDeckActive)
  const topStackCard = useAppSelector(selectTopStackCard)

  const dispatch = useAppDispatch()

  function drawFromDeck () {
    socket.emit('draw_from_deck', { currentRoom, username })
    dispatch(setCharacterUsableFalse())
    dispatch(setSelectPlayerTargetFalse())
    dispatch(setDeckActiveFalse())
    dispatch(setNextTurnTrue())
  }

  function handleClick () {
    if (!deckActive) return
    drawFromDeck()
  }

  let cardstyles = {}
  if (deckActive) {
    cardstyles = { border: 'solid 2px red', cursor: 'pointer' }
  }

  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  if (topStackCard !== null && topStackCard.isPlayable) {
    topStackCard.isPlayable = false
  }

  return (
    <div className='flex space-x-4'>

      {topStackCard !== null &&
        <Card
          card={topStackCard}
          predictUseCard={() => {}}
          predictUseBlueCard={() => {}}
          key={`${topStackCard.name}-${topStackCard.digit}-${topStackCard.type}`}
        />
      }
      <img
        className='w-[60px] xs:w-[80px] rounded-md'
        style={cardstyles}
        src={require('../img/gfx/cards/back-playing.png')}
        alt="deck card"
        onClick={() => { handleClick() }}
      />
    </div>
  )
}
