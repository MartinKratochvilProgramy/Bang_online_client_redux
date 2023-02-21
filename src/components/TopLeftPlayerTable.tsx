import React from 'react'
import { useAppSelector } from '../app/hooks'
import { selectCurrentPlayer } from '../features/currentPlayerSlice'
import { selectPlayersInRange } from '../features/playersInRangeSlice'
import { selectSelectPlayerTarget } from '../features/selectPlayerTargetSlice'
import { type CardI } from '../types/card'
import getCharacterDescription from '../utils/getCharacterDescription'
import { OponentCardOnTable } from './OponentCardOnTable'

interface Props {
  oponentName: string
  health: number
  character: string
  table: CardI[]
  cardsInHand: number[]
  largeMagicConstant: number
  smallMagicConstant: number
  cardClampLimit: number
  confirmCardTarget: (cardName: string, cardDigit: number, cardType: string) => void
  confirmPlayerTarget: (target: string) => void
  role?: string
}

export const TopLeftPlayerTable: React.FC<Props> = ({
  oponentName,
  health,
  character,
  table,
  cardsInHand,
  largeMagicConstant,
  smallMagicConstant,
  cardClampLimit,
  confirmCardTarget,
  confirmPlayerTarget,
  role
}) => {
  const currentPlayer = useAppSelector(selectCurrentPlayer)
  const playersInRange = useAppSelector(selectPlayersInRange)
  const selectPlayerTarget = useAppSelector(selectSelectPlayerTarget)

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const characterSource = require(`../img/gfx/characters/${character.replace(/\s/g, '')}png`)

  let roleSource
  if (role === null || role === undefined) {
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
    <div className='relative'>
      <div
        className='flex justify-start items-start h-[135px] xs:h-[176px] bg-beige rounded p-2'
      >
        <div className='flex z-20 w-auto min-w-[60px] xs:min-w-[80px] text-xs xs:text-sm flex-col-reverse items-start font-rye'>
          <div className='flex flex-col items-start'>
            <div className='overflow-visible'>{oponentName}</div>
            <div>HP: {health}</div>
          </div>
          <div className='flex justify-center group'>
            <img
              src={characterSource}
              style={characterStyles}
              onClick={() => { handleCharacterClick() }}
              className='w-[60px] xs:w-[80px]  rounded-md mr-2' alt="Player character">
            </img>
            <div className='hidden p-1 rounded group-hover:flex group-hover:flex-col group-hover:justify-center top-[96px] xs:top-[126px] w-[200px] mx-auto bg-transparentBlack text-white absolute'>
              <div className='text-xl'>
                {character}
              </div>
              <div className='text-xs'>
                {getCharacterDescription(character)}
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-start xs:justify-center w-auto min-w-[90px] group'>
          <img
            className='w-[60px] xs:w-[80px]'
            src={roleSource} alt="">
          </img>
        </div>

        <div id='top-cards' className='w-full flex justify-center'>
          <div className='max-h-full w-[240px] xs:w-[320px] flex relative'>
            {cardsInHand.map((card, index) => {
              let translate = 0
              let magicConstant = 222
              let cardWidth = 60
              const topCardsDiv = document.getElementById('top-cards')
              if (topCardsDiv !== null) {
                topCardsDiv.offsetWidth > 260 ? magicConstant = largeMagicConstant : magicConstant = smallMagicConstant
                topCardsDiv.offsetWidth > 260 ? cardWidth = 90 : cardWidth = 60
              }
              if (cardsInHand.length >= cardClampLimit) {
                translate = -((cardsInHand.length) * cardWidth - magicConstant) / (cardsInHand.length - 1) * index
              }
              return (
                <img
                  key={index}
                  className='w-[60px] xs:w-[80px]'
                  style={{ transform: `translate(${translate}px, 0)` }}
                  src={require('../img/gfx/cards/back-playing.png')} alt="" />
              )
            })}
          </div>
        </div>

      </div>
      <div className='space-x-2 absolute left-[100%] translate-x-[-100%] rotate-0 mt-1 xs:mt-2 flex justify-center'>
        {table.map(card => {
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
    </div>
  )
}
