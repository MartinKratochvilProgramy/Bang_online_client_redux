import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectCharacterChoiceInProgress } from '../features/characterChoiceInProgressSlice'
import { CharacterChoice } from './CharacterChoice'
import { Chat } from './Chat'
import { type KnownRoles } from '../types/knownRoles'
import { setKnownRoles } from '../features/knownRolesSlice'
import { selectMyHand, setMyHand } from '../features/myHandSlice'
import { setNextTurnTrue, setNextTurnFalse } from '../features/nextTurnSlice'

import { socket } from '../socket'
import { type CardI } from '../types/card'
import { selectPlayersLosingHealth, setPlayersLosingHealth } from '../features/playersLosingHealthSlice'
import { selectAllPlayersInfo } from '../features/allPlayersInfoSlice'
import { selectUsername } from '../features/usernameSlice'
import { setMyHealth } from '../features/myHealthSlice'
import { selectPlayersActionRequiredOnStart, setPlayersActionRequiredOnStart } from '../features/playersActionRequiredOnStartSlice'
import { setCharacterUsableFalse, setCharacterUsableTrue } from '../features/characterUsableSlice'
import { setPlayersInRange } from '../features/playersInRangeSlice'
import { selectCurrentRoom } from '../features/currentRoomSlice'
import { setCurrentPlayer } from '../features/currentPlayerSlice'
import { type PlayerLosingHealth } from '../types/playersLosingHealth'
import { setIsLosingHealthFalse, setIsLosingHealthTrue } from '../features/isLosingHealthSlice'
import { type PlayerActionRequiredOnStart } from '../types/playerActionRequiredOnStart'
import { setIndianiActiveFalse, setIndianiActiveTrue } from '../features/indianiActiveSlice'
import { setDuelActiveFalse, setDuelActiveTrue } from '../features/duelActiveSlice'
import { selectSelectCardTarget, setSelectCardTargetFalse } from '../features/selectCardTargetSlice'
import { setSelectPlayerTargetFalse, setSelectPlayerTargetTrue } from '../features/selectPlayerTargetSlice'
import { selectActiveCard, setActiveCard } from '../features/activeCardSlice'
import { setTopStackCard } from '../features/topStackCardSlice'
import { PlayerTable } from './PlayerTable'
import { setDiscardingFalse } from '../features/discardingSlice'
import { Console } from './Console'
import { StackDeck } from './StackDeck'
import { Oponents } from './Oponents'
import { selectCharacter } from '../features/characterSlice'
import { setDeckActiveTrue } from '../features/deckActiveSlice'

export const Game = () => {
  const username = useAppSelector(selectUsername)
  const characterChoiceInProgress = useAppSelector(selectCharacterChoiceInProgress)
  const playersLosingHealth = useAppSelector(selectPlayersLosingHealth)
  const allPlayersInfo = useAppSelector(selectAllPlayersInfo)
  const playersActionRequiredOnStart = useAppSelector(selectPlayersActionRequiredOnStart)
  const character = useAppSelector(selectCharacter)
  const currentRoom = useAppSelector(selectCurrentRoom)
  const selectCardTarget = useAppSelector(selectSelectCardTarget)
  const activeCard = useAppSelector(selectActiveCard)
  const myHand = useAppSelector(selectMyHand)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setNextTurnTrue())
    // disable next turn button if health decision req on other players
    for (const player of playersLosingHealth) {
      if (player.isLosingHealth) {
        dispatch(setNextTurnFalse())
      }
    }
  }, [playersLosingHealth])

  useEffect(() => {
    for (const player of allPlayersInfo) {
      if (player.name === username) {
        dispatch(setMyHealth(player.health))
      }
    }
  }, [allPlayersInfo, username])

  useEffect(() => {
    dispatch(setNextTurnTrue())
    // disable next turn button if dynamite, prison or action req from current player
    for (const player of playersActionRequiredOnStart) {
      if (player.name === username && (player.hasDynamite || player.isInPrison || player.actionRequired)) {
        dispatch(setNextTurnFalse())
        if (character !== 'Pedro Ramirez') {
          dispatch(setCharacterUsableFalse())
        }
        break
      }
    }
  }, [playersActionRequiredOnStart, username, setCharacterUsableFalse, character])

  useEffect(() => {
    socket.on('known_roles', (roles: KnownRoles) => {
      console.log('known roles: ', roles)
      dispatch(setKnownRoles(roles))
    })

    socket.on('my_hand', (hand: CardI[]) => {
      dispatch(setMyHand(hand))
    })

    socket.on('players_in_range', (players: string[]) => {
      dispatch(setPlayersInRange(players))
      console.log('Players in range')
    })

    socket.on('current_player', (playerName: string) => {
      if (username === '') return
      if (currentRoom === null) return
      dispatch(setCurrentPlayer(playerName))
      socket.emit('get_my_hand', { username, currentRoom })
    })

    socket.on('update_players_losing_health', (players: PlayerLosingHealth[]) => {
      dispatch(setPlayersLosingHealth(players))

      let playerFound = false
      for (const player of players) {
        if (player.name === username && player.isLosingHealth) {
          playerFound = true
        }
      }
      if (playerFound) {
        dispatch(setIsLosingHealthTrue())
      } else {
        dispatch(setIsLosingHealthFalse())
      }
    })

    socket.on('update_players_with_action_required', (players: PlayerActionRequiredOnStart[]) => {
      dispatch(setPlayersActionRequiredOnStart(players))
    })

    socket.on('indiani_active', (state: boolean) => {
      if (state) {
        dispatch(setIndianiActiveTrue())
      } else {
        dispatch(setIndianiActiveFalse())
      }
    })

    socket.on('duel_active', (state: boolean) => {
      if (state) {
        dispatch(setDuelActiveTrue())
      } else {
        dispatch(setDuelActiveFalse())
      }
    })

    socket.on('end_discard', () => {
      dispatch(setDiscardingFalse())
    })

    socket.on('jourdonnais_can_use_barel', () => {
      console.log('Jourdy ', character)

      if (character === 'Jourdonnais') {
        dispatch(setCharacterUsableTrue())
      }
    })

    socket.on('update_draw_choices', (characterName: string) => {
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
      socket.off('my_hand')
      socket.off('known_roles')
      socket.off('players_in_range')
      socket.off('current_player')
      socket.off('update_players_losing_health')
      socket.off('update_players_with_action_required')
      socket.off('indiani_active')
      socket.off('duel_active')
      socket.off('end_discard')
      socket.off('jourdonnais_can_use_barel')
      socket.off('update_draw_choices')
    }
  }, [character, currentRoom, setCharacterUsableTrue, username])

  function predictUseCard (cardName: string, cardDigit: number, cardType: string) {
    // place card on stack
    dispatch(setTopStackCard({ name: cardName, digit: cardDigit, type: cardType, isPlayable: false }))
    // splice card from my hand
    const newMyHand = [...myHand]
    const cardIndex = myHand.findIndex(card => (card.name === cardName && card.digit === cardDigit && card.type === cardType))
    newMyHand.splice(cardIndex, 1)

    dispatch(setMyHand(newMyHand))
  }

  function confirmCardTarget (cardName: string, cardDigit: number, cardType: string) {
    if (!selectCardTarget) return
    dispatch(setSelectPlayerTargetFalse())
    dispatch(setSelectCardTargetFalse())
    if (activeCard === null) return
    if (activeCard.name === 'Cat Balou') {
      socket.emit('play_cat_ballou_on_table_card', { activeCard, username, target: cardName, currentRoom, cardDigit, cardType })
    } else if (activeCard.name === 'Panico') {
      socket.emit('play_panico_on_table_card', { activeCard, username, target: cardName, currentRoom, cardDigit, cardType })
    }
    predictUseCard(cardName, cardDigit, cardType)
    dispatch(setActiveCard(null))
  }

  return (
    <div id='game'>
      {characterChoiceInProgress
        ? <div
          className='fixed flex flex-col items-center justify-center top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] m-auto space-y-4 xs:space-y-8'
          id="character-choice">
          <CharacterChoice />
          <Chat width={260} />
        </div>
        : <>
          <div id='oponents' className='fixed z-[30]'>
            <Oponents
              predictUseCard={predictUseCard}
              confirmCardTarget={confirmCardTarget}
            />
          </div>

          <div className='fixed flex justify-center items-center top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] m-auto z-[40]'>
            <StackDeck />
          </div>

          <div className='fixed flex justify-between items-end bottom-0 left-0 right-0 z-[50]'>
            <Chat width={260} />
            <PlayerTable
              predictUseCard={predictUseCard}
              confirmCardTarget={confirmCardTarget}
            />
            <Console />
          </div>
        </>
      }
    </div>
  )
}
