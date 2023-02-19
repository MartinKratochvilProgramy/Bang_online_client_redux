import React, { useState } from 'react'
import { setUsername } from '../features/usernameSlice'
import { useAppDispatch } from '../app/hooks'
import { Button } from './Button'

export const UsernameSelect = () => {
  const [usernameInput, setUsernameInput] = useState('')
  const dispatch = useAppDispatch()

  function handleSubmit () {
    sessionStorage.setItem('username', JSON.stringify(usernameInput))
    dispatch(setUsername(usernameInput))
    setUsernameInput('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='mt-4 xs:mt-24'
    >
      <label className="text-outline font-rye text-6xl text-white mb-6">
                Select username
      </label>
      <br />
      <div className='mt-4'>
        <input
          className='shadow appearance-none h-[43px] font-rye text-xl rounded bg-beige m-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          placeholder="Username..."
          maxLength={21}
          onChange={(e) => {
            setUsernameInput(e.target.value)
          }}
          value={usernameInput}
        />
        <Button
          onClick={handleSubmit}
          value={'Set username'}
          size={2}
        />

      </div>
    </form>
  )
}
