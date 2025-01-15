import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import unitsRouter from "./unit";
import authRouter from "./auth";
import progressRouter from "./progress";
import lessonRouter from "./lesson";

dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(bodyParser.json());

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:8081", // Ubah ini jika Anda ingin membatasi akses ke domain tertentu
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization,user-id", 
    credentials: true, // Izinkan pengiriman kredensial
  })
);

// Route setup
app.use("/api/units", unitsRouter);
app.use("/api/auth", authRouter);
app.use("/api/progress", progressRouter);
app.use("/api/lesson", lessonRouter);

// Default route for 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Route /
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
