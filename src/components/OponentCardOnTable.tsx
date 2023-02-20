import React from 'react'
import { useAppSelector } from '../app/hooks'
import { selectPlayersInRange } from '../features/playersInRangeSlice'
import { selectSelectCardTarget } from '../features/selectCardTargetSlice'
import { type CardI } from '../types/card'

interface Props {
  card: CardI
  oponentName: string
  confirmCardTarget: (cardName: string, cardDigit: number, cardType: string) => void
}

export const OponentCardOnTable: React.FC<Props> = ({ card, oponentName, confirmCardTarget }) => {
  const selectCardTarget = useAppSelector(selectSelectCardTarget)
  const playersInRange = useAppSelector(selectPlayersInRange)

  let styles
  if (selectCardTarget && playersInRange.includes(oponentName)) {
    styles = { color: 'red', border: 'solid 2px red', cursor: 'pointer' }
  } else {
    styles = { cursor: 'auto' }
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cardSource = require('../img/gfx/cards/' + card.name.replace(/!/, '').replace(/\s/, '').replace(/\./g, '') + '.png')

  return (
    <button
      onClick={() => { confirmCardTarget(card.name, card.digit, card.type) }}
      style={styles}
      className='w-[60px] xs:w-[80px] rounded-md group flex flex-row justify-center'>
      <img src={cardSource} alt="" />
      <div className='hidden p-1 font-rye absolute rounded group-hover:flex group-hover:flex-col group-hover:justify-center translate-y-[-60px] bg-transparentBlack text-white'>
        <div className='text-xl'>
          {card.name}
        </div>
        <div className='text-xs'>
          {card.digit} {card.type}
        </div>
      </div>
    </button>
  )
}
