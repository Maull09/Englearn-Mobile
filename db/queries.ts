import AsyncStorage from "@react-native-async-storage/async-storage";
import db from "./drizzle";
import { units, lessons, challenges, challengeProgress, userProfile } from "./schema";
import { eq } from "drizzle-orm";

/** Simulate user authentication and retrieve user ID from AsyncStorage */
const getUserId = async () => {
  const userId = await AsyncStorage.getItem("userId");
  return userId;
};

/** Get user profile */
export const getUserProfile = async () => {
  const userId = await getUserId();
  if (!userId) return null;

  const data = await db.query.userProfile.findFirst({
    where: eq(userProfile.userId, userId),
  });

  return data;
};

/** Get user challenge progress */
export const getUserChallengeProgress = async () => {
  const userId = await getUserId();
  if (!userId) return null;

  const data = await db.query.challengeProgress.findMany({
    where: eq(challengeProgress.userId, userId),
  });

  return data;
};

/** Get all units with lessons and challenges */
export const getUnits = async () => {
  const userId = await getUserId();
  const userProgress = await getUserProfile();
  if (!userId || !userProgress) return [];

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

  // Normalize data to add completion status
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

  return normalizedData;
};

/** Get unit by ID */
export const getUnitById = async (unitId: number) => {
  const data = await db.query.units.findFirst({
    where: eq(units.id, unitId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
      },
    },
  });
  return data;
};

/** Get lesson by ID */
export const getLesson = async (id?: number) => {
  const userId = await getUserId();
  if (!userId || !id) return null;

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, id),
    with: {
      challenges: {
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });

  if (!data || !data.challenges) return null;

  // Normalize challenges to include completion status
  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed);
    return { ...challenge, completed };
  });

  return { ...data, challenges: normalizedChallenges };
};
