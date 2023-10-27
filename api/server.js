import express from 'express'
import {json} from 'express'
import doctor from './doctor.js'
import patient from './patient.js'
import patientHistory from './patientHistory.js'
import appointment from './appointment.js'
const server = express()

server.use(json())

server.use("/api/doctor", doctor)
server.use("/api/patient", patient)
server.use("/api/patientHistory", patientHistory)
server.use("/api/appo", appointment)




export default server