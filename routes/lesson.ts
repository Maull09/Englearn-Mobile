import { Router, Request, Response } from 'express';
import db from '../db/drizzle';
import { lessons, challenges, challengeProgress } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// Get lesson by ID
router.get('/:lessonId', async (req: Request, res: Response) => {
  const { lessonId } = req.params;
  const userId = req.headers['user-id'] as string | undefined;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const data = await db.query.lessons.findFirst({
      where: eq(lessons.id, parseInt(lessonId)),
      with: {
        challenges: {
          with: {
            challengeOptions: true,
            challengeProgress: {
              where: eq(challengeProgress.userId, userId as string),
            },
          },
        },
      },
    });

    if (!data || !data.challenges) {
      res.status(404).json({ message: 'Lesson not found' });
      return;
    }

    const normalizedChallenges = data.challenges.map((challenge) => {
      const completed =
        challenge.challengeProgress &&
        challenge.challengeProgress.length > 0 &&
        challenge.challengeProgress.every((progress) => progress.completed);
      return { ...challenge, completed };
    });

    res.status(200).json({ ...data, challenges: normalizedChallenges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch lesson' });
  }
});

export default router;
