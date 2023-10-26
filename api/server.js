import express from 'express'
import {json} from 'express'
import doctor from './doctor.js'
import patient from './patient.js'
import patientHistory from './patientHistory.js'
const server = express()

server.use(json())

server.use("/api/doctor", doctor)
server.use("/api/patient", patient)
server.use("/api/patientHistory", patientHistory)




export default server