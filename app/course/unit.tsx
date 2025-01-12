import React from "react";
import { View, ScrollView } from "react-native";
import UnitBanner from "./unit-banner"; // Assuming UnitBanner is adapted for React Native
import LessonButton from "./lesson-button"; // Assuming LessonButton is adapted for React Native

type UnitProps = {
  id: number;
  title: string;
  order: number;
  description: string;
  lessons: {
    id: number;
    challenges: { id: number }[];
  }[];
  userChallengeProgress: { challengeId: number; completed: boolean }[];
};

const Unit: React.FC<UnitProps> = ({
  title,
  description,
  lessons,
  userChallengeProgress,
}) => {
  // Create a set of completed challenge IDs for quick lookup
  const completedChallengeIds = new Set(
    userChallengeProgress
      .filter((progress) => progress.completed)
      .map((progress) => progress.challengeId)
  );

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white"
    >
      {/* Unit Banner */}
      <UnitBanner title={title} description={description} />

      {/* Lesson Buttons */}
      <View className="mt-6 flex items-center">
        {lessons.map((lesson, i) => {
          // Determine if the lesson is completed by checking all its challenges
          const isLessonCompleted = lesson.challenges.every((challenge) =>
            completedChallengeIds.has(challenge.id)
          );

          const isCurrent = !isLessonCompleted; // Next lesson to work on if incomplete
          const isLocked = !isLessonCompleted && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={i}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              completed={isLessonCompleted}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Unit;
