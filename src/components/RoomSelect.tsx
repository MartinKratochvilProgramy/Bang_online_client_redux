import React from 'react'
import { UsernameSelect } from './UsernameSelect'
import { RoomCreate } from './RoomCreate'
import { useAppSelector } from '../app/hooks'
import { type Room } from '../types/room'
import { RoomInfo } from './RoomInfo'
import { selectUsername } from '../features/usernameSlice'
import { selectRooms } from '../features/roomsSlice'

export const RoomSelect = () => {
  const username = useAppSelector(selectUsername)
  const rooms = useAppSelector(selectRooms)

  // let gridStyle
  // rooms.length >= 3 ? gridStyle = 'grid-cols-2' : gridStyle = 'grid-cols-1'

  if (username === '') {
    return (
      <UsernameSelect />
    )
  } else {
    return (
      <div className='flex justify-center flex-col'>
        <h2 className='text-outline font-rye text-3xl text-white mt-3 mb-6'>
          {username}
        </h2>

        <h2 className='text-outline font-rye text-5xl text-white my-6'>
          Join existing room
        </h2>
        <div className='inline-grid gap-6 justify-center items-center'>
          {rooms.map((room: Room) => {
            return (
              <RoomInfo key={room.name} room={room} />
            )
          })}
        </div>

        <RoomCreate />
      </div>
    )
  }
}
