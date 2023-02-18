import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectMessages, setMessages } from '../features/messagesSlice'
import { selectUsername } from '../features/usernameSlice'
import { selectCurrentRoom } from '../features/currentRoomSlice'
import { type Message } from '../types/message'
import { Button } from './Button'

import { socket } from '../socket'

interface Props {
  width: number
}

export const Chat: React.FC<Props> = ({ width }) => {
  const [messageInput, setMessageInput] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messagesOutput, setMessagesOutput] = useState('')

  const messages = useAppSelector(selectMessages)
  const username = useAppSelector(selectUsername)
  const currentRoom = useAppSelector(selectCurrentRoom)

  const dispatch = useAppDispatch()

  const sendMessage = () => {
    socket.emit('send_message', { currentRoom, username, message: messageInput })
  }

  useEffect(() => {
    let messagesFormatted = ''
    for (let i = 0; i < messages.length; i++) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      messagesFormatted += `${messages[i].username} : ${messages[i].message}\n`
    }
    setMessagesOutput(messagesFormatted)
    const textArea = document.getElementById('text')
    if (textArea !== null) textArea.scrollTop = textArea.scrollHeight
  }, [messages])

  useEffect(() => {
    socket.on('get_messages', (messages: Message[]) => {
      dispatch(setMessages(messages))
    })

    return () => {
      socket.off('get_messages')
    }
  }, [])

  return (
    <div className='w-[280px] xs:w-[440px]'>
      <pre
        id="text"
        className={'bg-beige ml-0 rounded p-2 text-start text-sm xs:text-md overflow-auto w-full h-[120px] xs:h-[200px] font-rye'}
        // value={messagesOutput}
      >
        {messages.map((message, index) => {
          return (
            <div key={index} className='flex flex-row w-full text-start'>
              <div className=''>
                {message.username}:
              </div>
              <div className='text-gray-700 ml-2'>
                {message.message}
              </div>
            </div>
          )
        })}
      </pre>

      <form
        className={'flex justify-between w-full'}
        onSubmit={(e) => {
          e.preventDefault()
          setMessageInput('')
          sendMessage()
        }}
      >
        <div className="flex mt-2 w-full">
          <input
            className='shadow appearance-none h-[32px] w-full font-rye text-sm xs:text-md rounded bg-beige mr-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            placeholder="Message..."
            onChange={(e) => { setMessageInput(e.target.value) }}
            value={messageInput}
          />
          <div className="flex justify-end">
            <Button
              onClick={() => { }}
              value={'Send'}
              size={1.5}
            />
          </div>

        </div>
      </form>
    </div>
  )
}
