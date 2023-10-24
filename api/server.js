import express from 'express'
import {json} from 'express'
const server = express()

server.use(json())


export default server