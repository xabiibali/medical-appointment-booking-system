import express from "express";
import bcrypt from "bcrypt";
import prisma from "./lib/index.js";
import Jwt from "jsonwebtoken";
import "dotenv/config";
import authenticate from "./middleware/authentication.js";
const SECRET_KEY = process.env.SECRET_KEY;

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, address, phone, age } =
    req.body;
  try {
    const isexisting = await prisma.patient.findUnique({
      where: {
        email: email,
      },
    });

    if (isexisting) {
      return res.status(409).json({
        message: "patient is alredy exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newpatient = await prisma.patient.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        address,
        phone,
        age,
      },
    });

    return res.status(201).json({
      message: "patient creation successfully",
      patient: newpatient,
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
    const isexistingpatient = await prisma.patient.findUnique({
      where: {
        email,
      },
    });

    if (!isexistingpatient) {
      res.status(404).json({
        message: "patient was not found",
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      isexistingpatient.password
    );

    if (!checkPassword) {
      res.status(401).json({
        message: "invalid credentials",
      });
    }

    const token = Jwt.sign(
      { id: isexistingpatient.id, email: isexistingpatient.email },
      SECRET_KEY,
      { expiresIn: "2h" }
    );
    return res.status(201).json({
      message: "patient logedin successfully",
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
  const patientId = parseInt(req.params.id);
  const { firstName, lastName, email, password, address, phone, age } =
    req.body;

  try {
    const updatedpatient = await prisma.patient.update({
      where: { id: patientId },
      data: {
        firstName,
        lastName,
        email,
        password: password ? await bcrypt.hash(password, 10) : undefined,
        address,
        phone,
        age,
      },
    });

    return res.status(200).json({
      message: "patient information updated successfully",
      patient: updatedpatient,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const patientId = parseInt(req.params.id);

  try {
    const deletepatient = await prisma.patient.delete({
      where: { id: patientId },
    });

    if (!deletepatient) {
      return res.status(404).json({
        message: "patient was not found",
      });
    }

    return res.status(200).json({
      message: "patient successfully deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const patientId = parseInt(req.params.id);

  try {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        address: true,
        phone: true,
        age: true,
      },
    });

    if (!patient) {
      return res.status(404).json({
        message: "patient not found",
      });
    }

    return res.status(200).json({
      message: "patient information  retrieved successfully",
      patient,
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
    const patients = await prisma.patient.findMany({
      select: {
        firstName: true,
        lastName: true,
        email: true,
        address: true,
        phone: true,
        age: true,
      },
    });

    return res.status(200).json({
      message: "patients list retrieved successfully",
      patients,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

export default router;
