/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react'
import { selectUsername } from './features/usernameSlice'
import { selectCurrentRoom } from './features/currentRoomSlice'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { selectGameStarted, setGameStartedTrue } from './features/gameStartedSlice'
import { setPlayerCharacterChoice } from './features/playerCharacterChoice'
import { setCharacterChoiceInProgressTrue, setCharacterChoiceInProgressFalse } from './features/characterChoiceInProgressSlice'
import { setAllPlayersInfo } from './features/allPlayersInfoSlice'
import { setAllCharactersInfo } from './features/allCharactersInfoSlice'
import { setCharacter } from './features/characterSlice'
import { setRooms } from './features/roomsSlice'
// import { type User } from './types/user'
// import { type Card } from './types/card'
import './App.css'
import { RoomSelect } from './components/RoomSelect'
import { Room } from './components/Room'
import { Game } from './components/Game'
import { setPlayers } from './features/playersSlice'

import { socket } from './socket'

function App () {
  const currentRoom = useAppSelector(selectCurrentRoom)
  const gameStarted = useAppSelector(selectGameStarted)
  const username = useAppSelector(selectUsername)

  const dispatch = useAppDispatch()

  useEffect(() => {
  //   socket.on('username_changed', (username) => {
  //     setUsername(username)
  //   })

    socket.on('get_character_choices', (characters) => {
      // receive two characters to pick from
      dispatch(setGameStartedTrue())
      if (username === null) return
      dispatch(setCharacterChoiceInProgressTrue())
      dispatch(setPlayerCharacterChoice(characters[username]))
    })

    socket.on('rooms', (rooms) => {
      dispatch(setRooms(rooms))
    })

    socket.on('get_players', (players) => {
      dispatch(setPlayers(players))
    })

    // GAME LOGIC
    socket.on('game_started', data => {
      dispatch(setCharacterChoiceInProgressFalse())
      // setGameStarted(true) ???
      if (currentRoom !== null) {
        socket.emit('get_my_role', { username, currentRoom })
        socket.emit('get_my_hand', { username, currentRoom })
      }
      dispatch(setAllPlayersInfo(data.allPlayersInfo)) // info about health, hands...
      dispatch(setAllCharactersInfo(data.allCharactersInfo)) // info about character names
    })

    socket.on('characters', characters => {
      for (const character of characters) {
        if (character.playerName === username) {
          dispatch(setCharacter(character.character))
          break
        }
      }
    })

    //   socket.on('known_roles', roles => {
    //     // console.log("known roles: ", roles);
    //     setKnownRoles(roles)
    //   })

    //   socket.on('my_hand', hand => {
    //     setMyHand(hand)
    //   })

    //   socket.on('my_draw_choice', hand => {
    //     setMyDrawChoice(hand)
    //   })

    //   socket.on('update_hands', () => {
    //     if (username === '') return
    //     if (currentRoom === null) return
    //     socket.emit('get_my_hand', { username, currentRoom })
    //   })

    //   socket.on('update_all_players_info', (players) => {
    //     // returns array [{name, numberOfCards, health}]
    //     setAllPlayersInfo(players)
    //   })

    //   socket.on('emporio_state', (state) => {
    //     setEmporioState(state.cards)
    //     setNextEmporioTurn(state.nextEmporioTurn)
    //   })

    //   socket.on('game_ended', (winner) => {
    //     setWinner(winner)
    //   })

    return () => {
      //     socket.off('username_changed')
      socket.off('get_character_choices')
      socket.off('rooms')
      socket.off('get_players')
      socket.off('game_started')
      socket.off('characters')
      //     socket.off('known_roles')
      //     socket.off('my_hand')
      //     socket.off('my_draw_choice')
      //     socket.off('update_hands')
      //     socket.off('update_all_players_info')
      //     socket.off('emporio_state')
      //     socket.off('game_ended')
    }
  }, [currentRoom])
  // }, [consoleOutput, currentRoom, username])

  // function getEmporioCard (card: Card) {
  //   if (username !== nextEmporioTurn) return
  //   socket.emit('get_emporio_card', { username, currentRoom, card })

  //   const newEmporioState = emporioState
  //   const cardIndex = myHand.findIndex(foundCard => (foundCard.name === card.name && foundCard.digit === card.digit && foundCard.type === card.type))
  //   newEmporioState.splice(cardIndex, 1)
  //   setEmporioState(newEmporioState)
  // }

  // function getChoiceCard (card: Card) {
  //   setCharacterUsable(false)
  //   if (character === 'Kit Carlson') {
  //     setMyHand([...myHand, card])

  //     const newMyDrawChoice = myDrawChoice
  //     newMyDrawChoice.splice(myDrawChoice.findIndex((foundCard: Card) => (foundCard.name === card.name && foundCard.digit === card.digit && foundCard.type === card.type)))
  //     setMyDrawChoice(newMyDrawChoice)

  //     socket.emit('get_choice_card_KC', { username, currentRoom, card })
  //   } else if (character === 'Lucky Duke') {
  //     setMyHand([...myHand, card])

  //     setMyDrawChoice([])

  //     socket.emit('get_choice_card_LD', { username, currentRoom, card })
  //   }
  // }

  return (
    <div className="App flex flex-col justify-start items-center h-screen">
      {currentRoom === null
        ? <>
          <img className="w-[300px] xs:w-max mt-2 xs:mt-12" src={require('./img/bang-logo.png')} alt="Bang! logo" />
          <a href="/about" className="text-gray-800 hover:text-black text-2xl underline font-rye">
            About
          </a>
          <RoomSelect />
        </>
        : !gameStarted &&
        <Room />
      }
      {gameStarted &&
        <>
          <Game />
          {/* <div className='fixed flex justify-center items-center top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-[1100] m-auto'>
            {winner && <GameEnd winner={winner} setCurrentRoom={setCurrentRoom} />}
          </div>
          <div className='fixed flex justify-center items-center top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-[1000] m-auto'>
            {myDrawChoice.length > 0 && <DrawChoice cards={myDrawChoice} getChoiceCard={getChoiceCard} />}
          </div>
          <div className='fixed flex justify-center items-center top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-[1000] m-auto'>
            {emporioState.length > 0 && <EmporionChoice cards={emporioState} getEmporioCard={getEmporioCard} username={username} nextEmporioTurn={nextEmporioTurn} />}
          </div> */}

        </>
      }
    </div>
  )
}

export default App
