import React, { useEffect } from 'react'
import { Card } from './Card'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectDeckActive, setDeckActiveFalse } from '../features/deckActiveSlice'
import { selectCurrentRoom } from '../features/currentRoomSlice'
import { selectUsername } from '../features/usernameSlice'
import { setCharacterUsableFalse } from '../features/characterUsableSlice'
import { setSelectPlayerTargetFalse } from '../features/selectPlayerTargetSlice'
import { setNextTurnTrue } from '../features/nextTurnSlice'
import { selectTopStackCard, setTopStackCard } from '../features/topStackCardSlice'
import { type CardI } from '../types/card'

import { socket } from '../socket'

export const StackDeck = () => {
  const username = useAppSelector(selectUsername)
  const currentRoom = useAppSelector(selectCurrentRoom)
  const deckActive = useAppSelector(selectDeckActive)
  const topStackCard = useAppSelector(selectTopStackCard)

  const dispatch = useAppDispatch()

  useEffect(() => {
    socket.on('update_top_stack_card', (card: CardI) => {
      dispatch(setTopStackCard(card))
    })

    return () => {
      socket.off('update_top_stack_card')
    }
  }, [])

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
    try {
      topStackCard.isPlayable = false
    } catch (error) {
      console.log(error)
      console.log(topStackCard)
    }
  }

  return (
    <div className='flex space-x-4'>
      {topStackCard !== null &&
        <Card
          card={topStackCard}
          stackCard={true}
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
