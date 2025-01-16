import { Router, Request, Response } from "express";
import db from "../db/drizzle";
import { challengeProgress, challenges } from "../db/schema";
import { eq, and } from "drizzle-orm";

const router = Router();

/**
 * Get progress for a specific user
 */
router.get("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: "Missing user ID" });
    return;
  }

  try {
    const progress = await db.query.challengeProgress.findMany({
      where: eq(challengeProgress.userId, userId),
      with: {
        challenge: {
          with: {
            lesson: true,
          },
        },
      },
    });

    res.status(200).json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Update progress for a specific challenge
 */
router.put("/:userId/challenge/:challengeId", async (req: Request, res: Response) => {
  const { userId, challengeId } = req.params;
  const { completed } = req.body;

  if (!userId || !challengeId || typeof completed !== "boolean") {
    res.status(400).json({ message: "Missing required fields or invalid data" });
    return;
  }

  try {
    const existingProgress = await db.query.challengeProgress.findFirst({
      where: and(
        eq(challengeProgress.userId, userId),
        eq(challengeProgress.challengeId, parseInt(challengeId, 10))
      ),
    });

    if (existingProgress) {
      // Update existing progress
      await db.update(challengeProgress)
        .set({ completed })
        .where(
          and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, parseInt(challengeId, 10))
          )
        );
    } else {
      // Insert new progress
      await db.insert(challengeProgress).values({
        userId,
        challengeId: parseInt(challengeId, 10),
        completed,
      });
    }

    res.status(200).json({ message: "Progress updated successfully" });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Mark all challenges in a lesson as complete
 */
router.put("/:userId/lesson/:lessonId", async (req: Request, res: Response) => {
  const { userId, lessonId } = req.params;

  if (!userId || !lessonId) {
    res.status(400).json({ message: "Missing user ID or lesson ID" });
    return;
  }

  try {
    // Fetch all challenges for the lesson
    const challengesInLesson = await db.query.challenges.findMany({
      where: eq(challenges.lessonId, parseInt(lessonId, 10)),
    });

    if (!challengesInLesson.length) {
        res.status(404).json({ message: "No challenges found for this lesson" });
        return;
    }

    // Update or insert progress for each challenge
    const progressUpdates = challengesInLesson.map(async (challenge) => {
      const existingProgress = await db.query.challengeProgress.findFirst({
        where: and(
          eq(challengeProgress.userId, userId),
          eq(challengeProgress.challengeId, challenge.id)
        ),
      });

      if (existingProgress) {
        await db.update(challengeProgress)
          .set({ completed: true })
          .where(
            and(
              eq(challengeProgress.userId, userId),
              eq(challengeProgress.challengeId, challenge.id)
            )
          );
      } else {
        await db.insert(challengeProgress).values({
          userId,
          challengeId: challenge.id,
          completed: true,
        });
      }
    });

    await Promise.all(progressUpdates);

    res.status(200).json({ message: "All challenges in the lesson marked as complete" });
  } catch (error) {
    console.error("Error updating lesson progress:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;

