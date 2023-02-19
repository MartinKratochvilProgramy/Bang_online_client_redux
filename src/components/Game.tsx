import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectCharacterChoiceInProgress } from '../features/characterChoiceInProgressSlice'
import { CharacterChoice } from './CharacterChoice'
import { Chat } from './Chat'
import { type KnownRoles } from '../types/knownRoles'
import { setKnownRoles } from '../features/knownRolesSlice'
import { setMyHand } from '../features/myHandSlice'
import { setNextTurnTrue, setNextTurnFalse } from '../features/nextTurnSlice'

import { socket } from '../socket'
import { type Card } from '../types/card'
import { selectPlayersLosingHealth, setPlayersLosingHealth } from '../features/playersLosingHealthSlice'
import { selectAllPlayersInfo } from '../features/allPlayersInfoSlice'
import { selectUsername } from '../features/usernameSlice'
import { setMyHealth } from '../features/myHealthSlice'
import { selectPlayersActionRequiredOnStart } from '../features/playersActionRequiredOnStartSlice'
import { setCharacterUsableFalse } from '../features/characterUsableSlice'
import { setPlayersInRange } from '../features/playersInRangeSlice'
import { selectCurrentRoom } from '../features/currentRoomSlice'
import { setCurrentPlayer } from '../features/currentPlayerSlice'
import { type PlayerLosingHealth } from '../types/playersLosingHealth'
import { setIsLosingHealthFalse, setIsLosingHealthTrue } from '../features/isLosingHealthSlice'

export const Game = () => {
  const username = useAppSelector(selectUsername)
  const characterChoiceInProgress = useAppSelector(selectCharacterChoiceInProgress)
  const playersLosingHealth = useAppSelector(selectPlayersLosingHealth)
  const allPlayersInfo = useAppSelector(selectAllPlayersInfo)
  const playersActionRequiredOnStart = useAppSelector(selectPlayersActionRequiredOnStart)
  const character = useAppSelector(selectUsername)
  const currentRoom = useAppSelector(selectCurrentRoom)

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

    socket.on('my_hand', (hand: Card[]) => {
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

    //     socket.on('update_players_with_action_required', (players) => {
    //       setPlayersActionRequiredOnStart(players)
    //     })

    //     socket.on('indiani_active', (state) => {
    //       setIndianiActive(state)
    //     })

    //     socket.on('duel_active', (state) => {
    //       setDuelActive(state)
    //     })

    //     socket.on('update_top_stack_card', (card) => {
    //       setTopStackCard(card)
    //     })

    //     socket.on('end_discard', () => {
    //       setDiscarding(false)
    //     })

    //     socket.on('jourdonnais_can_use_barel', () => {
    //       if (character === 'Jourdonnais') {
    //         setCharacterUsable(true)
    //       }
    //     })

    return () => {
      socket.off('my_hand')
      socket.off('known_roles')
      //       socket.off('players_in_range')
      //       socket.off('current_player')
      //       socket.off('update_players_losing_health')
      //       socket.off('update_players_with_action_required')
      //       socket.off('indiani_active')
      //       socket.off('duel_active')
      //       socket.off('update_top_stack_card')

      //       socket.off('end_discard')
      //       socket.off('jourdonnais_can_use_barel')
    }
  //   }, [character, currentRoom, setCharacterUsable, username])
  }, [])

  //   function confirmPlayerTarget (target) {
  //     if (!selectPlayerTarget) return
  //     setSelectPlayerTarget(false)
  //     setSelectCardTarget(false)
  //     const cardName = activeCard.name
  //     const cardDigit = activeCard.digit
  //     const cardType = activeCard.type

  //     if (cardName === 'Bang!') {
  //       socket.emit('play_bang', { username, target, currentRoom, cardDigit, cardType })
  //       setNextTurn(false)
  //     } else if (cardName === 'Mancato!' && character === 'Calamity Janet') {
  //       socket.emit('play_mancato_as_CJ', { target, currentRoom, cardDigit, cardType })
  //       setNextTurn(false)
  //     } else if (cardName === 'Duel') {
  //       socket.emit('play_duel', { target, currentRoom, cardDigit, cardType })
  //       setNextTurn(false)
  //     } else if (cardName === 'Cat Balou') {
  //       socket.emit('play_cat_ballou', { target, currentRoom, cardDigit, cardType })
  //     } else if (cardName === 'Panico') {
  //       socket.emit('play_panico', { target, currentRoom, cardDigit, cardType })
  //     } else if (cardName === 'Prigione') {
  //       socket.emit('play_prigione', { username, target, currentRoom, activeCard })
  //     } else if (Object.keys(activeCard).length === 0 && character === 'Jesse Jones') {
  //       // no active card and Jese jones
  //       socket.emit('jesse_jones_target', { username, target, currentRoom })
  //       setCharacterUsable(false)
  //       setDeckActive(false)
  //     }
  //     if (cardName !== 'Prigione') {
  //       predictUseCard(cardName, cardDigit, cardType)
  //       setAllNotPlayable()
  //     }
  //     setActiveCard({})
  //   }

  //   function confirmCardTarget (cardName, cardDigit, cardType) {
  //     if (!selectCardTarget) return
  //     setSelectPlayerTarget(false)
  //     setSelectCardTarget(false)
  //     if (activeCard.name === 'Cat Balou') {
  //       socket.emit('play_cat_ballou_on_table_card', { activeCard, username, target: cardName, currentRoom, cardDigit, cardType })
  //     } else if (activeCard.name === 'Panico') {
  //       socket.emit('play_panico_on_table_card', { activeCard, username, target: cardName, currentRoom, cardDigit, cardType })
  //     }
  //     predictUseCard(cardName, cardDigit, cardType)
  //     setActiveCard({})
  //   }

  //   function activateCharacter () {
  //     if (!characterUsable && character !== 'Sid Ketchum') return

  //     if (character === 'Jourdonnais') {
  //       setCharacterUsable(false)
  //       socket.emit('jourdonnais_barel', { currentRoom, username })
  //     }

  //     if (character === 'Pedro Ramirez') {
  //       setCharacterUsable(false)
  //       setSelectPlayerTarget(false)
  //       setDeckActive(false)
  //       setNextTurn(true)
  //       socket.emit('get_stack_card_PR', { currentRoom, username })
  //     }

  //     if (character === 'Sid Ketchum') {
  //       setDiscarding(true)
  //     }
  //   }

  //   function drawFromDeck () {
  //     socket.emit('draw_from_deck', { currentRoom, username })
  //     setCharacterUsable(false)
  //     setSelectPlayerTarget(false)
  //     setDeckActive(false)
  //     setNextTurn(true)
  //   }

  //   function predictUseCard (cardName, cardDigit, cardType) {
  //     // place card on stack
  //     setTopStackCard({ name: cardName, digit: cardDigit, type: cardType })
  //     // splice card from my hand
  //     const newMyHand = myHand
  //     const cardIndex = myHand.findIndex(card => (card.name === cardName && card.digit === cardDigit && card.type === cardType))
  //     newMyHand.splice(cardIndex, 1)

  //     setMyHand(newMyHand)
  //   }

  //   function predictUseBlueCard (cardName, cardDigit, cardType) {
  //     // splice card from my hand
  //     const newMyHand = myHand
  //     const cardIndex = myHand.findIndex(card => (card.name === cardName && card.digit === cardDigit && card.type === cardType))
  //     newMyHand.splice(cardIndex, 1)

  //     setMyHand(newMyHand)
  //   }

  //   function setAllNotPlayable () {
  //     const newMyHand = myHand
  //     for (const card of newMyHand) {
  //       card.isPlayable = false
  //     }
  //     setMyHand(newMyHand)
  //   }

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
          {/* <div id='oponents' className='fixed z-[30]'>
            <Oponents />

          </div>

          <div className='fixed flex justify-center items-center top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] m-auto z-[40]'>
            <StackDeck />
          </div>

          <div className='fixed flex justify-between items-end bottom-0 left-0 right-0 z-[50]'>
            <Chat sendMessage={sendMessage} messages={messages} width={260} />
            <PlayerTable />
            <Console consoleOutput={consoleOutput} />
          </div> */}
        </>
      }
    </div>
  )
}
