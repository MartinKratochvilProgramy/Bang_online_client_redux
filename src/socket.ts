import * as io from 'socket.io-client'

// export const socket = io.connect("bangonlineserver-production.up.railway.app");
export const socket = io.connect('http://localhost:3001')

// bangonlineserver-production.up.railway.app
// http://localhost:3001
