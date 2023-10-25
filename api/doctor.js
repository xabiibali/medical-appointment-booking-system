import express from "express";
import bcrypt from "bcrypt";
import prisma from "./lib/index.js";
import Jwt from "jsonwebtoken";
import "dotenv/config";
import authenticate from "./middleware/authentication.js";
const SECRET_KEY = process.env.SECRET_KEY;

const router = express.Router();

router.post("/signup", async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    specialization,
    bio,
    schedule,
    hospital,
  } = req.body;
  try {
    const isexisting = await prisma.doctor.findUnique({
      where: {
        email: email,
      },
    });

    if (isexisting) {
      return res.status(409).json({
        message: "doctor is alredy exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = await prisma.doctor.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        specialization,
        bio,
        schedule,
        hospital,
      },
    });

    return res.status(201).json({
      message: "doctor creation successfully",
      doctor: newDoctor,
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isexistingdoctor = await prisma.doctor.findUnique({
      where: {
        email,
      },
    });

    if (!isexistingdoctor) {
      res.status(404).json({
        message: "doctor was not found",
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      isexistingdoctor.password
    );

    if (!checkPassword) {
      res.status(401).json({
        message: "invalid credentials",
      });
    }

    const token = Jwt.sign(
      { id: isexistingdoctor.id, email: isexistingdoctor.email },
      SECRET_KEY,
      { expiresIn: "2h" }
    );
    return res.status(201).json({
      message: "doctor logedin successfully",
      token: token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message,
    });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  const doctorId = parseInt(req.params.id);
  const {
    name,
    email,
    password,
    phone,
    specialization,
    bio,
    schedule,
    hospital,
  } = req.body;

  try {
    const updateddoctor = await prisma.doctor.update({
      where: { id: doctorId },
      data: {
        name,
        email,
        password: password ? await bcrypt.hash(password, 10) : undefined,
        phone,
        specialization,
        bio,
        schedule,
        hospital,
      },
    });

    return res.status(200).json({
      message: "doctor information updated successfully",
      doctor: updateddoctor,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const doctorId = parseInt(req.params.id);

  try {
    const deletedoctor = await prisma.doctor.delete({
      where: { id: doctorId },
    });

    if (!deletedoctor) {
      return res.status(404).json({
        message: "doctor was not found",
      });
    }

    return res.status(200).json({
      message: "doctor successfully deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const doctorId = parseInt(req.params.id);

  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      select: {
        name: true,
        email: true,
        phone: true,
        specialization: true,
        bio: true,
        schedule: true,
        hospital: true,
      },
    });

    if (!doctor) {
      return res.status(404).json({
        message: "doctor not found",
      });
    }

    return res.status(200).json({
      message: " information doctor retrieved successfully",
      doctor,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.get("/", async (req, res) => {
   
    try {
      const doctors = await prisma.doctor.findMany({
        select: {
          id: true,  
          name: true,
          email: true,
          phone: true,
          specialization: true,
          bio: true,
          schedule: true,
          hospital: true,
        },
      });
  
      return res.status(200).json({
        message: "doctors list retrieved successfully",
        doctors,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Something went wrong",
        error: err.message,
      });
    }
  });
  

export default router;
