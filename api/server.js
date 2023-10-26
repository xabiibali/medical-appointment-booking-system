import express from 'express'
import {json} from 'express'
import doctor from './doctor.js'
import patient from './patient.js'
const server = express()

server.use(json())

server.use("/api/doctor", doctor)
server.use("/api/patient", patient)



export default server