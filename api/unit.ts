import { Router, Request, Response } from 'express';
import db from '../db/drizzle';
import { units, lessons, challenges, challengeProgress } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// Get all units
router.get('/', async (req: Request, res: Response) => {
  const userId = req.headers['user-id'] as string; // Explicitly cast to string

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const data = await db.query.units.findMany({
      orderBy: (units, { asc }) => [asc(units.order)],
      with: {
        lessons: {
          orderBy: (lessons, { asc }) => [asc(lessons.order)],
          with: {
            challenges: {
              with: {
                challengeProgress: {
                  where: eq(challengeProgress.userId, userId),
                },
              },
            },
          },
        },
      },
    });

    const normalizedData = data.map((unit) => {
      const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
        const allCompletedChallenges = lesson.challenges.every((challenge) => {
          return (
            challenge.challengeProgress &&
            challenge.challengeProgress.length > 0 &&
            challenge.challengeProgress.every((progress) => progress.completed)
          );
        });
        return { ...lesson, completed: allCompletedChallenges };
      });

      return { ...unit, lessons: lessonsWithCompletedStatus };
    });

    res.status(200).json(normalizedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch units' });
  }
});

export default router;
