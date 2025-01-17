import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import db from "../db/drizzle";
import { userProfile } from "../db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

const router = Router();

// Register a new user
router.post("/register", async (req: Request, res: Response) => {
  const { email, password, userName, profileImageSrc } = req.body;

  if (!email || !password || !userName) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  try {
    // Check if the user already exists
    const existingUser = await db.query.userProfile.findFirst({
      where: eq(userProfile.email, email),
    });

    if (existingUser) {
      res.status(400).json({ message: "Email is already registered" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const userId = randomUUID();
    await db.insert(userProfile).values({
      userId,
      email,
      password: hashedPassword,
      userName,
      profileImageSrc: profileImageSrc || "/default_avatar.png",
    });

    const newUser = await db.query.userProfile.findFirst({
      where: eq(userProfile.userId, userId),
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        userId: newUser?.userId,
        email,
        userName,
        profileImageSrc: profileImageSrc || "../../assets/images/default_avatar.png",
      },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login a user
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Missing email or password" });
    return;
  }

  try {
    // Find the user in the database
    const user = await db.query.userProfile.findFirst({
      where: eq(userProfile.email, email),
    });

    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const userData = {
      userId: user.userId,
      userName: user.userName,
      email: user.email,
      profileImageSrc: user.profileImageSrc,
    };

    // Check if the request is from a web browser
    const isWeb = req.headers["user-agent"]?.includes("Mozilla");

    if (isWeb) {
      // Set cookie for web clients
      res.cookie("userData", JSON.stringify(userData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        domain: process.env.NODE_ENV === "production" ? "englearnuniversal.vercel.app" : "localhost",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ message: "Login successful", user: userData });
      return;
    }

    // For mobile clients, return the user data in JSON
    res.status(200).json({ message: "Login successful", user: userData });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Logout a user
router.post("/logout", (req, res) => {
  res.clearCookie("userData", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    domain: process.env.NODE_ENV === "production" ? "englearnuniversal.vercel.app" : "localhost",
  });
  res.status(200).json({ message: "Logged out successfully" });
});


// Fetch user profile by ID
router.get("/profile/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await db.query.userProfile.findFirst({
      where: eq(userProfile.userId, id),
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
