import React from 'react'
import { useAppSelector } from '../app/hooks'
import { selectCharacterChoiceInProgress } from '../features/characterChoiceInProgressSlice'
import { CharacterChoice } from './CharacterChoice'
import { Chat } from './Chat'

// import { socket } from '../socket'

export const Game = () => {
  const characterChoiceInProgress = useAppSelector(selectCharacterChoiceInProgress)

  //   useEffect(() => {
  //     setNextTurn(true)
  //     // disable next turn button if health decision req on other players
  //     for (const player of playersLosingHealth) {
  //       if (player.isLosingHealth) {
  //         setNextTurn(false)
  //       }
  //     }
  //   }, [playersLosingHealth])

  //   useEffect(() => {
  //     for (const player of allPlayersInfo) {
  //       if (player.name === username) {
  //         setMyHealth(player.health)
  //       }
  //     }
  //   }, [allPlayersInfo, username])

  //   useEffect(() => {
  //     setNextTurn(true)
  //     // disable next turn button if dynamite, prison or action req from current player
  //     for (const player of playersActionRequiredOnStart) {
  //       if (player.name === username && (player.hasDynamite || player.isInPrison || player.actionRequired)) {
  //         setNextTurn(false)
  //         if (character !== 'Pedro Ramirez') {
  //           setCharacterUsable(false)
  //         }
  //         break
  //       }
  //     }
  //   }, [playersActionRequiredOnStart, username, setCharacterUsable, character])

  //   useEffect(() => {
  //     socket.on('players_in_range', players => {
  //       setPlayersInRange(players)
  //       console.log('Players in range')
  //     })

  //     socket.on('current_player', playerName => {
  //       if (username === '') return
  //       if (currentRoom === null) return
  //       setCurrentPlayer(playerName)
  //       socket.emit('get_my_hand', { username, currentRoom })
  //     })

  //     socket.on('update_players_losing_health', (players) => {
  //       setPlayersLosingHealth(players)

  //       let playerFound = false
  //       for (const player of players) {
  //         if (player.name === username && player.isLosingHealth) {
  //           playerFound = true
  //         }
  //       }
  //       if (playerFound) {
  //         setIsLosingHealth(true)
  //       } else {
  //         setIsLosingHealth(false)
  //       }
  //     })

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

  //     socket.on('update_draw_choices', (characterName) => {
  //       if (username === '') return
  //       if (currentRoom === null) return
  //       if (characterName === character) {
  //         if (characterName === 'Jesse Jones') {
  //           setSelectPlayerTarget(true)
  //           setDeckActive(true)
  //           socket.emit('request_players_in_range', { range: 'max', currentRoom, username })
  //         } else if (characterName === 'Pedro Ramirez') {
  //           setDeckActive(true)
  //           setCharacterUsable(true)
  //         } else {
  //           socket.emit('get_my_draw_choice', { username, currentRoom, character })
  //         }
  //       }
  //     })

  //     socket.on('end_discard', () => {
  //       setDiscarding(false)
  //     })

  //     socket.on('jourdonnais_can_use_barel', () => {
  //       if (character === 'Jourdonnais') {
  //         setCharacterUsable(true)
  //       }
  //     })

  //     return () => {
  //       socket.off('players_in_range')
  //       socket.off('current_player')
  //       socket.off('update_players_losing_health')
  //       socket.off('update_players_with_action_required')
  //       socket.off('indiani_active')
  //       socket.off('duel_active')
  //       socket.off('update_top_stack_card')
  //       socket.off('update_draw_choices')
  //       socket.off('end_discard')
  //       socket.off('jourdonnais_can_use_barel')
  //     }
  //   }, [character, currentRoom, setCharacterUsable, username])

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
