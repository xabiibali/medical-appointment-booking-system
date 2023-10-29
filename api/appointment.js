// 2023-07-26T09:30:00Z
import express from "express";
import prisma from "./lib/index.js";
import authenticate from "./middleware/authentication.js";

const router = express.Router();

router.post("/",  async (req, res) => {
  const { appointmentDate, duration, description, doctorId, patientId } =
    req.body;
  try {
    const newAppointment = await prisma.appointment.create({
      data: {
        appointmentDate: appointmentDate,
        duration: duration,
        description: description,
        doctorId: doctorId,
        patientId: patientId,
      },

    });

  return res.status(201).json({
    message: "appointment creation successfully",
    appointment: newAppointment
  })

  } catch (eror) {
    return res.status(500).json({
      message: "something  went wrong",
      error: eror.message,
    });
  }
});


router.put("/:id",  async (req, res) => {
    const id = parseInt(req.params.id)
    const { appointmentDate, duration, description, doctorId, patientId } =
      req.body;
    try {
      const updateAppointment = await prisma.appointment.update({
        where: {id: id},

        data: {
          appointmentDate: appointmentDate,
          duration: duration,
          description: description,
          doctorId: doctorId,
          patientId: patientId,
        },
  
      });
  
    return res.status(201).json({
      message: "appointment updated successfully",
      appointment: updateAppointment
    })
  
    } catch (eror) {
      return res.status(500).json({
        message: "something  went wrong",
        error: eror.message,
      });
    }
  });
  

router.delete("/:id", async (req, res) => {
    const id =  parseInt(req.params.id) 
   
    try {
        const deleteAppo = await prisma.appointment.delete({
          where: { id: id },
        });
    
        if (!deleteAppo) {
          return res.status(404).json({
            message: "appointment was not found",
          });
        }
    
        return res.status(200).json({
          message: "appointment successfully deleted",
        });
      } catch (err) {
        return res.status(500).json({
          message: "Something went wrong",
          error: err.message,
        });
      }
})




router.get("/:id", async (req, res) => {
  const id  = parseInt(req.params.id);
  
try {

   const appo = await prisma.appointment.findUnique({
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

  if (!appo) {
    res.status(404).json({
       error: "appointment not found"
       });
  } else {
    res.status(200).json({ 
      message: "appointment retreived",
     data: appo 
    });
  }
} catch (error) {
  res.status(500).json({ error: "Error retrieving appointment" });
}
});


router.get("/", async (req, res) => {
  try {
    const appo = await prisma.appointment.findMany({
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
         message: "appointments retrieved",
         data: appo
         });

  } catch (error) {
    res.status(500).json({
         error: "Error retrieving appointment" 
        });
  }
});


export default router