import React from 'react'
import { type CardI } from '../types/card'
import { useAppDispatch, useAppSelector } from '../app/hooks'

import { socket } from '../socket'
import { selectDiscarding } from '../features/discardingSlice'
import { selectMyHand, setMyHandNotPlayable } from '../features/myHandSlice'
import { selectMyHealth } from '../features/myHealthSlice'
import { selectUsername } from '../features/usernameSlice'
import { selectCurrentRoom } from '../features/currentRoomSlice'
import { selectCurrentPlayer } from '../features/currentPlayerSlice'
import { selectIndianiActive } from '../features/indianiActiveSlice'
import { selectDuelActive } from '../features/duelActiveSlice'
import { selectCharacter } from '../features/characterSlice'
import { setNextTurnFalse } from '../features/nextTurnSlice'
import { setSelectPlayerTargetFalse, setSelectPlayerTargetTrue } from '../features/selectPlayerTargetSlice'
import { setSelectCardTargetFalse, setSelectCardTargetTrue } from '../features/selectCardTargetSlice'
import { setIsLosingHealthFalse } from '../features/isLosingHealthSlice'
import { setActiveCard } from '../features/activeCardSlice'

interface Props {
  card: CardI
  predictUseCard: (cardName: string, cardDigit: number, cardType: string) => void
  predictUseBlueCard: (cardName: string, cardDigit: number, cardType: string) => void
  stackCard?: boolean
  onClick?: () => void
}

export const Card: React.FC<Props> = ({ card, predictUseCard, predictUseBlueCard, stackCard, onClick }) => {
  const username = useAppSelector(selectUsername)
  const character = useAppSelector(selectCharacter)
  const currentRoom = useAppSelector(selectCurrentRoom)
  const discarding = useAppSelector(selectDiscarding)
  const myHand = useAppSelector(selectMyHand)
  const myHealth = useAppSelector(selectMyHealth)
  const currentPlayer = useAppSelector(selectCurrentPlayer)
  const indianiActive = useAppSelector(selectIndianiActive)
  const duelActive = useAppSelector(selectDuelActive)

  const dispatch = useAppDispatch()

  const isPlayable = card.isPlayable
  const cardName = card.name
  const cardDigit = card.digit
  const cardType = card.type

  function handleClick () {
    if (onClick !== undefined) {
      onClick()
      return
    }

    if (discarding) {
      predictUseCard(cardName, cardDigit, cardType)
      if (myHand.length <= myHealth) {
        dispatch(setMyHandNotPlayable())
        dispatch(setNextTurnFalse())
      }
      socket.emit('discard', { username, currentRoom, card })
      return
    }

    if (!isPlayable) return

    dispatch(setSelectPlayerTargetFalse())
    dispatch(setSelectCardTargetFalse())

    if (cardName === 'Bang!') {
      if (username !== currentPlayer && !indianiActive && !duelActive && character === 'Calamity Janet') {
        socket.emit('play_bang_as_CJ', { username, currentRoom, cardDigit, cardType })
        predictUseCard(cardName, cardDigit, cardType)
        dispatch(setMyHandNotPlayable())
        dispatch(setIsLosingHealthFalse())
      } else if (!duelActive && !indianiActive) {
        dispatch(setActiveCard(card))
        dispatch(setSelectPlayerTargetTrue())
        socket.emit('request_players_in_range', { range: 1, currentRoom, username })
      } else if (indianiActive) {
        socket.emit('play_bang_on_indiani', { username, currentRoom, cardDigit, cardType })
        predictUseCard(cardName, cardDigit, cardType)
        dispatch(setMyHandNotPlayable())
      } else if (duelActive) {
        socket.emit('play_bang_in_duel', { username, currentRoom, cardDigit, cardType })
        predictUseCard(cardName, cardDigit, cardType)
        dispatch(setMyHandNotPlayable())
      }
    } else if (cardName === 'Mancato!') {
      if (username === currentPlayer && !duelActive && character === 'Calamity Janet') {
        console.log('we are here')

        dispatch(setActiveCard(card))
        dispatch(setSelectPlayerTargetTrue())
        socket.emit('request_players_in_range', { range: 1, currentRoom, username })
      } else if (duelActive && character === 'Calamity Janet') {
        socket.emit('play_mancato_in_duel', { username, currentRoom, cardDigit, cardType })
        predictUseCard(cardName, cardDigit, cardType)
        dispatch(setMyHandNotPlayable())
      } else if (indianiActive && character === 'Calamity Janet') {
        socket.emit('play_mancato_on_indiani', { username, currentRoom, cardDigit, cardType })
        predictUseCard(cardName, cardDigit, cardType)
        dispatch(setMyHandNotPlayable())
      } else {
        socket.emit('play_mancato', { username, currentRoom, cardDigit, cardType })
        predictUseCard(cardName, cardDigit, cardType)
        dispatch(setMyHandNotPlayable())
        dispatch(setIsLosingHealthFalse())
      }
    } else if (cardName === 'Beer') {
      socket.emit('play_beer', { username, currentRoom, cardDigit, cardType })
      predictUseCard(cardName, cardDigit, cardType)
    } else if (cardName === 'Saloon') {
      socket.emit('play_saloon', { username, currentRoom, cardDigit, cardType })
      predictUseCard(cardName, cardDigit, cardType)
    } else if (cardName === 'Emporio') {
      socket.emit('play_emporio', { username, currentRoom, cardDigit, cardType })
      predictUseCard(cardName, cardDigit, cardType)
      dispatch(setMyHandNotPlayable())
    } else if (cardName === 'Diligenza') {
      socket.emit('play_diligenza', { username, currentRoom, cardDigit, cardType })
      predictUseCard(cardName, cardDigit, cardType)
    } else if (cardName === 'Wells Fargo') {
      socket.emit('play_wellsfargo', { username, currentRoom, cardDigit, cardType })
      predictUseCard(cardName, cardDigit, cardType)
    } else if (cardName === 'Gatling') {
      socket.emit('play_gatling', { username, currentRoom, cardDigit, cardType })
      predictUseCard(cardName, cardDigit, cardType)
      dispatch(setMyHandNotPlayable())
      dispatch(setNextTurnFalse())
    } else if (cardName === 'Indiani') {
      socket.emit('play_indiani', { username, currentRoom, cardDigit, cardType })
      predictUseCard(cardName, cardDigit, cardType)
      dispatch(setMyHandNotPlayable())
      dispatch(setNextTurnFalse())
    } else if (cardName === 'Duel') {
      dispatch(setActiveCard(card))
      dispatch(setSelectPlayerTargetTrue())
      socket.emit('request_players_in_range', { range: 'max', currentRoom, username })
    } else if (cardName === 'Cat Balou') {
      dispatch(setActiveCard(card))
      dispatch(setSelectPlayerTargetTrue())
      dispatch(setSelectCardTargetTrue())
      socket.emit('request_players_in_range', { range: 'max', currentRoom, username })
    } else if (cardName === 'Panico') {
      dispatch(setActiveCard(card))
      dispatch(setSelectPlayerTargetTrue())
      dispatch(setSelectCardTargetTrue())
      socket.emit('request_players_in_range', { range: 'one_not_gun', currentRoom, username })
    } else if (card.rimColor === 'blue' && cardName !== 'Prigione') {
      socket.emit('place_blue_card_on_table', { username, currentRoom, card })
      predictUseBlueCard(cardName, cardDigit, cardType)
    } else if (cardName === 'Prigione') {
      dispatch(setActiveCard(card))
      dispatch(setSelectPlayerTargetTrue())
      socket.emit('request_players_in_range', { range: 'max_not_sheriff', currentRoom, username })
    }
  }

  let styles
  if (isPlayable && stackCard === undefined) {
    styles = { color: 'red', border: 'solid 2px red', cursor: 'pointer' }
  }
  if (discarding && stackCard === undefined) {
    styles = { color: 'red', border: 'solid 2px red', cursor: 'pointer' }
  }

  if (cardName === undefined) return null

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cardSource = require('../img/gfx/cards/' + cardName.replace(/!/, '').replace(/\s/, '').replace(/\./g, '') + '.png')

  return (
    <button
      onClick={handleClick}
      style={styles}
      className='w-[60px] xs:w-[80px] rounded-md group flex flex-row justify-center'>
      <img src={cardSource} alt="" />
      <div className='hidden p-1 z-40 font-rye absolute group-hover:flex group-hover:flex-col group-hover:justify-center translate-y-[-60px] bg-transparentBlack text-white'>
        <div className='text-xl'>
          {cardName}
        </div>
        <div className='text-xs'>
          {cardDigit} {cardType}
        </div>
      </div>
    </button>
  )
}
