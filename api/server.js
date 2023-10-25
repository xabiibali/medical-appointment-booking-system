import express from 'express'
import {json} from 'express'
import doctor from './doctor.js'
const server = express()

server.use(json())

server.use("/api/doctor", doctor)



export default server