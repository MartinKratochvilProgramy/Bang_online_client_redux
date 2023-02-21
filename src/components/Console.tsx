import React, { useState, useEffect } from 'react'

import { socket } from '../socket'

export const Console = () => {
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])

  useEffect(() => {
    socket.on('console', (consoleMessage: string[]) => {
      for (let i = 0; i < consoleMessage.length; i++) {
        const message = consoleMessage[i]
        setConsoleOutput(consoleOutput => [...consoleOutput, message])
      }
    })

    return () => {
      socket.off('console')
    }
  }, [])

  useEffect(() => {
    const textArea = document.getElementById('console-output')
    if (textArea !== null) textArea.scrollTop = textArea.scrollHeight
  }, [consoleOutput])

  return (
    <div
      id='console-output'
      className='bg-beige rounded w-[280px] xs:w-[320px] p-2 text-sm xs:text-md overflow-auto  h-[160px] xs:h-[240px]'>
      {consoleOutput.map((message, index) => {
        return (
          <div key={index} className='flex text-start w-full my-1'>
            {message}
          </div>
        )
      })}
    </div>
  )
}
