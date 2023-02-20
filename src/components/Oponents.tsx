import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectActiveCard, setActiveCard } from '../features/activeCardSlice'
// import { type CharacterInfo, selectAllCharactersInfo } from '../features/allCharactersInfoSlice'
import { type PlayerInfo, selectAllPlayersInfo } from '../features/allPlayersInfoSlice'
import { selectCharacter } from '../features/characterSlice'
import { setCharacterUsableFalse } from '../features/characterUsableSlice'
import { selectCurrentRoom } from '../features/currentRoomSlice'
import { setDeckActiveFalse } from '../features/deckActiveSlice'
import { setMyHandNotPlayable } from '../features/myHandSlice'
import { setNextTurnFalse } from '../features/nextTurnSlice'
import { setSelectCardTargetFalse } from '../features/selectCardTargetSlice'
import { selectSelectPlayerTarget, setSelectPlayerTargetFalse } from '../features/selectPlayerTargetSlice'
import { selectUsername } from '../features/usernameSlice'

import { socket } from '../socket'
import { TopPlayerTable } from './TopPlayerTable'

interface Props {
  predictUseCard: (cardName: string, cardDigit: number, cardType: string) => void
  confirmCardTarget: (cardName: string, cardDigit: number, cardType: string) => void
}

export const Oponents: React.FC<Props> = ({ predictUseCard, confirmCardTarget }) => {
  const username = useAppSelector(selectUsername)
  const allPlayersInfo = useAppSelector(selectAllPlayersInfo)
  //   const allCharactersInfo = useAppSelector(selectAllCharactersInfo)
  const selectPlayerTarget = useAppSelector(selectSelectPlayerTarget)
  const activeCard = useAppSelector(selectActiveCard)
  const currentRoom = useAppSelector(selectCurrentRoom)
  const character = useAppSelector(selectCharacter)

  const dispatch = useAppDispatch()

  //   const playerIndex = allPlayersInfo.findIndex((player: PlayerInfo) => {
  //     // index of user player
  //     return (player.name === username)
  //   })

  // remove user player from players info array
  const oponentsInfo = allPlayersInfo.filter((player: PlayerInfo) => {
    return (player.name !== username)
  })
  // remove user player from characters info array
  //   const charactersInfo = allCharactersInfo.filter((player: CharacterInfo) => {
  //     return (player.name !== username)
  //   })

  function confirmPlayerTarget (target: string) {
    if (!selectPlayerTarget) return
    if (activeCard == null) return

    dispatch(setSelectPlayerTargetFalse())
    dispatch(setSelectCardTargetFalse())
    const cardName = activeCard.name
    const cardDigit = activeCard.digit
    const cardType = activeCard.type

    if (cardName === 'Bang!') {
      socket.emit('play_bang', { username, target, currentRoom, cardDigit, cardType })
      dispatch(setNextTurnFalse())
    } else if (cardName === 'Mancato!' && character === 'Calamity Janet') {
      socket.emit('play_mancato_as_CJ', { target, currentRoom, cardDigit, cardType })
      dispatch(setNextTurnFalse())
    } else if (cardName === 'Duel') {
      socket.emit('play_duel', { target, currentRoom, cardDigit, cardType })
      dispatch(setNextTurnFalse())
    } else if (cardName === 'Cat Balou') {
      socket.emit('play_cat_ballou', { target, currentRoom, cardDigit, cardType })
    } else if (cardName === 'Panico') {
      socket.emit('play_panico', { target, currentRoom, cardDigit, cardType })
    } else if (cardName === 'Prigione') {
      socket.emit('play_prigione', { username, target, currentRoom, activeCard })
    } else if (Object.keys(activeCard).length === 0 && character === 'Jesse Jones') {
      // no active card and Jese jones
      socket.emit('jesse_jones_target', { username, target, currentRoom })
      dispatch(setCharacterUsableFalse())
      dispatch(setDeckActiveFalse())
    }
    if (cardName !== 'Prigione') {
      predictUseCard(cardName, cardDigit, cardType)
      dispatch(setMyHandNotPlayable())
    }
    dispatch(setActiveCard(null))
  }

  if (oponentsInfo.length === 1) {
    return (
      <div className='w-[390px] xs:w-[560px] z-50 fixed left-[50%] translate-x-[-50%]'>
        <TopPlayerTable
          oponentName={oponentsInfo[0].name}
          health={oponentsInfo[0].health}
          table={oponentsInfo[0].table}
          cardsInHand={new Array(oponentsInfo[0].numberOfCards).fill(0)}
          largeMagicConstant={352}
          smallMagicConstant={222}
          cardClampLimit={4}
          confirmCardTarget={confirmCardTarget}
          confirmPlayerTarget={confirmPlayerTarget}
        />
      </div>
    )
    //   }

    //   if (oponentsInfo.length === 3) {
    //     return (
    //       <div>
    //         <div className='fixed z-10 flex items-end justify-start w-[490px] left-[-172px] xs:left-[-158px] top-[348px] xs:top-[320px] rotate-90'>
    //           <SidePlayerTable
    //             cardsInHand={new Array(oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].numberOfCards).fill(0)}
    //             table={oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].table}
    //             oponentName={oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].name}
    //             currentRoom={currentRoom}
    //             activateCharacter={activateCharacter}
    //             selectCardTarget={selectCardTarget}
    //             selectPlayerTarget={selectPlayerTarget}
    //             confirmCardTarget={confirmCardTarget}
    //             currentPlayer={currentPlayer}
    //             username={username}
    //             character={charactersInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].character}
    //             role={knownRoles[oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].name]}
    //             characterUsable={characterUsable}
    //             health={oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].health}
    //             playersInRange={playersInRange}
    //             confirmPlayerTarget={confirmPlayerTarget}
    //             rotateDescription={-90}
    //           />
    //         </div>
    //         <div className='fixed top-0 left-[50%] translate-x-[-50%] z-5'>
    //           <div className='w-[420px] xs:w-[620px]'>
    //             <TopPlayerTable
    //               cardsInHand={new Array(oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].numberOfCards).fill(0)}
    //               table={oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].table}
    //               oponentName={oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].name}
    //               currentRoom={currentRoom}
    //               activateCharacter={activateCharacter}
    //               selectCardTarget={selectCardTarget}
    //               selectPlayerTarget={selectPlayerTarget}
    //               confirmCardTarget={confirmCardTarget}
    //               currentPlayer={currentPlayer}
    //               username={username}
    //               character={charactersInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].character}
    //               role={knownRoles[oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].name]}
    //               characterUsable={characterUsable}
    //               health={oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].health}
    //               playersInRange={playersInRange}
    //               confirmPlayerTarget={confirmPlayerTarget}
    //               largeMagicConstant={352}
    //               smallMagicConstant={222}
    //               cardClampLimit={4}
    //             />
    //           </div>
    //         </div>
    //         <div className='fixed z-10 flex items-end justify-end w-[490px] right-[-172px] xs:right-[-158px] top-[348px] xs:top-[320px] rotate-[270deg]'>
    //           <SidePlayerTable
    //             cardsInHand={new Array(oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].numberOfCards).fill(0)}
    //             table={oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].table}
    //             oponentName={oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].name}
    //             currentRoom={currentRoom}
    //             activateCharacter={activateCharacter}
    //             selectCardTarget={selectCardTarget}
    //             selectPlayerTarget={selectPlayerTarget}
    //             confirmCardTarget={confirmCardTarget}
    //             currentPlayer={currentPlayer}
    //             username={username}
    //             character={charactersInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].character}
    //             role={knownRoles[oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].name]}
    //             characterUsable={characterUsable}
    //             health={oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].health}
    //             playersInRange={playersInRange}
    //             confirmPlayerTarget={confirmPlayerTarget}
    //             rotateDescription={90}
    //           />
    //         </div>
    //       </div>
    //     )
    //   }

    //   if (oponentsInfo.length === 4) {
    //     return (
    //       <div className=''>
    //         <div className='fixed z-10 flex items-end justify-start w-[490px] left-[-172px] xs:left-[-158px] top-[288px] xs:top-[348px] rotate-90 '>
    //           <SidePlayerTable
    //             cardsInHand={new Array(oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].numberOfCards).fill(0)}
    //             table={oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].table}
    //             oponentName={oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].name}
    //             currentRoom={currentRoom}
    //             activateCharacter={activateCharacter}
    //             selectCardTarget={selectCardTarget}
    //             selectPlayerTarget={selectPlayerTarget}
    //             confirmCardTarget={confirmCardTarget}
    //             currentPlayer={currentPlayer}
    //             username={username}
    //             character={charactersInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].character}
    //             role={knownRoles[oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].name]}
    //             characterUsable={characterUsable}
    //             health={oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].health}
    //             playersInRange={playersInRange}
    //             confirmPlayerTarget={confirmPlayerTarget}
    //             rotateDescription={-90}
    //           />
    //         </div>
    //         <div className='fixed top-0 left-0 right-0 flex justify-center space-x-4 z-5'>
    //           <div className='w-[420px] xs:w-[620px]'>
    //             <TopPlayerTable
    //               cardsInHand={new Array(oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].numberOfCards).fill(0)}
    //               table={oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].table}
    //               oponentName={oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].name}
    //               currentRoom={currentRoom}
    //               activateCharacter={activateCharacter}
    //               selectCardTarget={selectCardTarget}
    //               selectPlayerTarget={selectPlayerTarget}
    //               confirmCardTarget={confirmCardTarget}
    //               currentPlayer={currentPlayer}
    //               username={username}
    //               character={charactersInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].character}
    //               role={knownRoles[oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].name]}
    //               characterUsable={characterUsable}
    //               health={oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].health}
    //               playersInRange={playersInRange}
    //               confirmPlayerTarget={confirmPlayerTarget}
    //               largeMagicConstant={402}
    //               smallMagicConstant={238}
    //               cardClampLimit={5}
    //             />
    //           </div>
    //           <div className='w-[420px] xs:w-[620px]'>
    //             <TopPlayerTable
    //               cardsInHand={new Array(oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].numberOfCards).fill(0)}
    //               table={oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].table}
    //               oponentName={oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].name}
    //               currentRoom={currentRoom}
    //               activateCharacter={activateCharacter}
    //               selectCardTarget={selectCardTarget}
    //               selectPlayerTarget={selectPlayerTarget}
    //               confirmCardTarget={confirmCardTarget}
    //               currentPlayer={currentPlayer}
    //               username={username}
    //               character={charactersInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].character}
    //               role={knownRoles[oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].name]}
    //               characterUsable={characterUsable}
    //               health={oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].health}
    //               playersInRange={playersInRange}
    //               confirmPlayerTarget={confirmPlayerTarget}
    //               largeMagicConstant={402}
    //               smallMagicConstant={232}
    //               cardClampLimit={5}
    //             />
    //           </div>
    //         </div>
    //         <div className='fixed flex items-end justify-end w-[490px] right-[-182px] xs:right-[-158px] top-[288px] xs:top-[348px] rotate-[270deg]'>
    //           <SidePlayerTable
    //             cardsInHand={new Array(oponentsInfo[clamp(playerIndex + 3, allPlayersInfo.length - 1)].numberOfCards).fill(0)}
    //             table={oponentsInfo[clamp(playerIndex + 3, allPlayersInfo.length - 1)].table}
    //             oponentName={oponentsInfo[clamp(playerIndex + 3, allPlayersInfo.length - 1)].name}
    //             currentRoom={currentRoom}
    //             activateCharacter={activateCharacter}
    //             selectCardTarget={selectCardTarget}
    //             selectPlayerTarget={selectPlayerTarget}
    //             confirmCardTarget={confirmCardTarget}
    //             currentPlayer={currentPlayer}
    //             username={username}
    //             character={charactersInfo[clamp(playerIndex + 3, allPlayersInfo.length - 1)].character}
    //             role={knownRoles[oponentsInfo[clamp(playerIndex + 3, allPlayersInfo.length - 1)].name]}
    //             characterUsable={characterUsable}
    //             health={oponentsInfo[clamp(playerIndex + 3, allPlayersInfo.length - 1)].health}
    //             playersInRange={playersInRange}
    //             confirmPlayerTarget={confirmPlayerTarget}
    //             rotateDescription={90}
    //           />
    //         </div>
    //       </div>
    //     )
    //   }

    //   if (oponentsInfo.length === 5) {
    //     return (
    //       <div className=''>
    //         <div className='fixed flex items-end justify-start w-[490px] left-[-172px] xs:left-[-158px] top-[294px] xs:top-[360px] rotate-90 '>
    //           <SidePlayerTable
    //             cardsInHand={new Array(oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].numberOfCards).fill(0)}
    //             table={oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].table}
    //             oponentName={oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].name}
    //             currentRoom={currentRoom}
    //             activateCharacter={activateCharacter}
    //             selectCardTarget={selectCardTarget}
    //             selectPlayerTarget={selectPlayerTarget}
    //             confirmCardTarget={confirmCardTarget}
    //             currentPlayer={currentPlayer}
    //             username={username}
    //             character={charactersInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].character}
    //             role={knownRoles[oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].name]}
    //             characterUsable={characterUsable}
    //             health={oponentsInfo[clamp(playerIndex + 0, allPlayersInfo.length - 1)].health}
    //             playersInRange={playersInRange}
    //             confirmPlayerTarget={confirmPlayerTarget}
    //             rotateDescription={-90}
    //           />
    //         </div>
    //         <div className='fixed top-0 left-0 right-0 flex justify-center space-x-2 z-5'>
    //           <div className='w-[350px] xs:w-[620px] z-1'>
    //             <TopLeftPlayerTable
    //               cardsInHand={new Array(oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].numberOfCards).fill(0)}
    //               table={oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].table}
    //               oponentName={oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].name}
    //               currentRoom={currentRoom}
    //               activateCharacter={activateCharacter}
    //               selectCardTarget={selectCardTarget}
    //               selectPlayerTarget={selectPlayerTarget}
    //               confirmCardTarget={confirmCardTarget}
    //               currentPlayer={currentPlayer}
    //               username={username}
    //               character={charactersInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].character}
    //               role={knownRoles[oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].name]}
    //               characterUsable={characterUsable}
    //               health={oponentsInfo[clamp(playerIndex + 1, allPlayersInfo.length - 1)].health}
    //               playersInRange={playersInRange}
    //               confirmPlayerTarget={confirmPlayerTarget}
    //               largeMagicConstant={362}
    //               smallMagicConstant={152}
    //               cardClampLimit={4}
    //             />
    //           </div>
    //           <div className='w-[350px] xs:w-[620px] z-[10]'>
    //             <TopPlayerTable
    //               cardsInHand={new Array(oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].numberOfCards).fill(0)}
    //               table={oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].table}
    //               oponentName={oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].name}
    //               currentRoom={currentRoom}
    //               activateCharacter={activateCharacter}
    //               selectCardTarget={selectCardTarget}
    //               selectPlayerTarget={selectPlayerTarget}
    //               confirmCardTarget={confirmCardTarget}
    //               currentPlayer={currentPlayer}
    //               username={username}
    //               character={charactersInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].character}
    //               role={knownRoles[oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].name]}
    //               characterUsable={characterUsable}
    //               health={oponentsInfo[clamp(playerIndex + 2, allPlayersInfo.length - 1)].health}
    //               playersInRange={playersInRange}
    //               confirmPlayerTarget={confirmPlayerTarget}
    //               largeMagicConstant={362}
    //               smallMagicConstant={152}
    //               cardClampLimit={4}
    //             />
    //           </div>
    //           <div className='w-[350px] xs:w-[620px] z-[11]'>
    //             <TopRightPlayerTable
    //               cardsInHand={new Array(oponentsInfo[clamp(playerIndex + 3, allPlayersInfo.length - 1)].numberOfCards).fill(0)}
    //               table={oponentsInfo[clamp(playerIndex + 3, allPlayersInfo.length - 1)].table}
    //               oponentName={oponentsInfo[clamp(playerIndex + 3, allPlayersInfo.length - 1)].name}
    //               currentRoom={currentRoom}
    //               activateCharacter={activateCharacter}
    //               selectCardTarget={selectCardTarget}
    //               selectPlayerTarget={selectPlayerTarget}
    //               confirmCardTarget={confirmCardTarget}
    //               currentPlayer={currentPlayer}
    //               username={username}
    //               character={charactersInfo[clamp(playerIndex + 3, allPlayersInfo.length - 1)].character}
    //               role={knownRoles[oponentsInfo[clamp(playerIndex + 3, allPlayersInfo.length - 1)].name]}
    //               characterUsable={characterUsable}
    //               health={oponentsInfo[clamp(playerIndex + 3, allPlayersInfo.length - 1)].health}
    //               playersInRange={playersInRange}
    //               confirmPlayerTarget={confirmPlayerTarget}
    //               largeMagicConstant={362}
    //               smallMagicConstant={152}
    //               cardClampLimit={4}
    //             />
    //           </div>
    //         </div>
    //         <div className='fixed flex items-end justify-end w-[490px] right-[-172px] xs:right-[-158px] top-[294px] xs:top-[360px] rotate-[270deg]'>
    //           <SidePlayerTable
    //             cardsInHand={new Array(oponentsInfo[clamp(playerIndex + 4, allPlayersInfo.length - 1)].numberOfCards).fill(0)}
    //             table={oponentsInfo[clamp(playerIndex + 4, allPlayersInfo.length - 1)].table}
    //             oponentName={oponentsInfo[clamp(playerIndex + 4, allPlayersInfo.length - 1)].name}
    //             currentRoom={currentRoom}
    //             activateCharacter={activateCharacter}
    //             selectCardTarget={selectCardTarget}
    //             selectPlayerTarget={selectPlayerTarget}
    //             confirmCardTarget={confirmCardTarget}
    //             currentPlayer={currentPlayer}
    //             username={username}
    //             character={charactersInfo[clamp(playerIndex + 4, allPlayersInfo.length - 1)].character}
    //             role={knownRoles[oponentsInfo[clamp(playerIndex + 4, allPlayersInfo.length - 1)].name]}
    //             characterUsable={characterUsable}
    //             health={oponentsInfo[clamp(playerIndex + 4, allPlayersInfo.length - 1)].health}
    //             playersInRange={playersInRange}
    //             confirmPlayerTarget={confirmPlayerTarget}
    //             rotateDescription={90}
    //           />
    //         </div>
    //       </div>
    //     )
  } else {
    return null
  }
}
