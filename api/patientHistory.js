import express from "express";
import prisma from "./lib/index.js";
import {docterVerified} from "./middleware/authentication.js";
const router = express.Router();

// Create a new PatientHistory
router.post("/", docterVerified, async (req, res) => {
  try {
    const { treatment, patientId, details } = req.body;
    const doctorId = req.doctor.id

    const newHistory = await prisma.patientHistory.create({
      data: { treatment, patientId, details, doctorId },
    });

    res.status(201).json({ 
        message: "PatientHistory created",
         data: newHistory 
        });

  } catch (error) {
    res.status(500).json({
         error: "Error creating PatientHistory"
         });
  }
});


router.get("/:id", docterVerified , async (req, res) => {
    const id  = parseInt(req.params.id);
    
  try {

     const history = await prisma.patientHistory.findUnique({
      where: { id: id },
      include:{
        Patient:{
            select:{
                firstName: true,
                lastName: true,
                email: true,
                address: true,
                phone: true,
                age: true,
            }
        }
      }
    });

    if (!history) {
      res.status(404).json({
         error: "PatientHistory not found"
         });
    } else {
      res.status(200).json({ message: "PatientHistory retreived", data: history });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving PatientHistory" });
  }
});

// Update a PatientHistory by ID
router.put("/:id", docterVerified, async (req, res) => {
  try {
    const { id } = req.params;
    const doctorId = req.doctor.id
    const { treatment, patientId, details } = req.body;
    const updatedHistory = await prisma.patientHistory.update({
      where: { id: Number(id) },
      data: { treatment,patientId, details, doctorId },

    });

    res.status(200).json({
         message: "PatientHistory updated",
          data: updatedHistory
         });
  } catch (error) {
    res.status(500).json({ error: "Error updating PatientHistory" });
  }
});

// Delete a PatientHistory by ID
router.delete("/:id", docterVerified, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHistory = await prisma.patientHistory.delete({
      where: { id: Number(id) },
    });

    if (deletedHistory) {
      res.status(200).json({
         message: "PatientHistory deleted"
         });
    } else {
      res.status(404).json({ 
        error: "PatientHistory not found"
     });
    }
  } catch (error) {
    res.status(500).json({
     error: "Error deleting PatientHistory"
     });
  }
});

// List all PatientHistories
router.get("/", docterVerified, async (req, res) => {
  try {
    const histories = await prisma.patientHistory.findMany({
        include:{
            Patient:{
                select:{
                    firstName: true,
                    lastName: true,
                    email: true,
                    address: true,
                    phone: true,
                    age: true,
                }
            }
        }
    });
         res.status(200).json({ 
         message: "PatientHistories retrieved",
         data: histories
         });

  } catch (error) {
    res.status(500).json({
         error: "Error retrieving PatientHistories" 
        });
  }
});

 export default router