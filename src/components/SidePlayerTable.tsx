import React, { useEffect } from 'react'
import { useAppSelector } from '../app/hooks'
import { selectCurrentPlayer } from '../features/currentPlayerSlice'
import { selectPlayersInRange } from '../features/playersInRangeSlice'
import { selectSelectPlayerTarget } from '../features/selectPlayerTargetSlice'
import { type CardI } from '../types/card'
import getCharacterDescription from '../utils/getCharacterDescription'
import { OponentCardOnTable } from './OponentCardOnTable'

interface Props {
  role: string
  oponentName: string
  health: number
  character: string
  table: CardI[]
  rotateDescription: number
  cardsInHand: number[]
  confirmCardTarget: (cardName: string, cardDigit: number, cardType: string) => void
  confirmPlayerTarget: (target: string) => void
}

export const SidePlayerTable: React.FC<Props> = ({ role, oponentName, health, character, table, rotateDescription, cardsInHand, confirmCardTarget, confirmPlayerTarget }) => {
  const currentPlayer = useAppSelector(selectCurrentPlayer)
  const playersInRange = useAppSelector(selectPlayersInRange)
  const selectPlayerTarget = useAppSelector(selectSelectPlayerTarget)

  useEffect(() => {
    console.log(':::::::::::')
    // console.log('role ', role)
    console.log('oponentName ', oponentName)
    // console.log('health ', health)
    // console.log('character ', character)
    // console.log('table ', table)
    // console.log('rotateDescription ', rotateDescription)
    // console.log('cardsInHand ', cardsInHand)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const characterSource = require(`../img/gfx/characters/${character.replace(/\s/g, '')}.png`)

  let roleSource
  if (role === null) {
    roleSource = require('../img/gfx/roles/back-role.png')
  } else {
    roleSource = require('../img/gfx/roles/' + role + '.png')
  }

  let characterStyles = {}
  if (oponentName === currentPlayer || (playersInRange.includes(oponentName) && selectPlayerTarget)) {
    characterStyles = { color: 'red', border: 'solid 2px red', cursor: 'pointer' }
  }

  function handleCharacterClick () {
    if (!playersInRange.includes(oponentName)) return
    confirmPlayerTarget(oponentName)
  }

  return (
    <div className='w-[300px] xs:w-full z-50 relative'>
      <div className='space-x-2 absolute left-[50%] translate-x-[-50%] flex justify-center mb-1 xs:mb-2 translate-y-[-95px] xs:translate-y-[-130px]'>
        {table.map((card: CardI) => {
          return (
            <OponentCardOnTable
              card={card}
              oponentName={oponentName}
              confirmCardTarget={confirmCardTarget}
              key={`${card.name}-${card.digit}-${card.type}`}
            />
          )
        })}
      </div>
      <div
        className='flex justify-between items-end mx-4 h-[145px] xs:h-[176px] bg-beige rounded p-2 relative'
      >
        <div className='flex w-auto min-w-[60px] xs:min-w-[80px] text-sm flex-col items-start font-rye'>
          <div className='overflow-visible'>{oponentName}</div>
          <div>HP: {health}</div>
          <div className='relative flex justify-center group'>
            <img
              src={characterSource}
              style={characterStyles}
              onClick={() => { handleCharacterClick() }}
              className='w-[60px] xs:w-[80px] rounded-md ml-2 mr-4'
              alt="Player character">
            </img>
            <div
              style={{ rotate: `${rotateDescription}deg` }}
              className={'hidden p-1 z-10 rounded group-hover:flex group-hover:flex-col group-hover:justify-center left-[10px] top-[-50px] w-[200px] mx-auto bg-transparentBlack text-white absolute'}>
              <div className='text-xl'>
                {character}
              </div>
              <div className='text-xs'>
                {getCharacterDescription(character)}
              </div>
            </div>
          </div>
        </div>

        <div className='flex w-auto min-w-[70px] xs:min-w-[90px] relative group'>
          <img
            className='w-[60px] xs:w-[80px]'
            src={roleSource} alt="">
          </img>
        </div>

        <div id='cards' className='max-h-full w-full flex justify-center'>
          <div className='max-h-full w-[272px] flex relative'>
            {cardsInHand.map((card, index) => {
              let translate = 0
              let magicConstant = 72
              let cardWidth = 60
              let cardClamp = 3 // how many cards in hand before it gets squished
              const cardsElement = document.getElementById('cards')
              if (cardsElement !== null) {
                cardsElement.offsetWidth > 260 ? magicConstant = 292 : magicConstant = 112
                cardsElement.offsetWidth > 260 ? cardWidth = 90 : cardWidth = 60
                cardsElement.offsetWidth > 260 ? cardClamp = 4 : cardClamp = 3
              }
              if (cardsInHand.length >= cardClamp) {
                translate = -((cardsInHand.length) * cardWidth - magicConstant) / (cardsInHand.length - 1) * index
              }
              return (
              // unknown card
                <img
                  key={index}
                  style={{ transform: `translate(${translate}px, 0)` }}
                  className='w-[60px] xs:w-[80px] translate-x-[-40px]'
                  src={require('../img/gfx/cards/back-playing.png')} alt="" />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
