import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Quiz } from "./quiz";
import  VideoPlayer  from "./video";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCookie } from "@/utils/util";
import { showAlert } from "@/utils/util";


const LessonPage = () => {
  const [lesson, setLesson] = useState<any>(null);
  const [userChallengeProgress, setUserChallengeProgress] = useState<any[]>([]);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const params = useLocalSearchParams();

  const id = params?.id ? Number(params.id) : null; // Ensure ID is a number

  const fetchData = async () => {
    try {
        const userCookie = (await AsyncStorage.getItem("userData")) || getCookie("userData");  
        const userId = userCookie ? JSON.parse(userCookie).userId : null;    
        setUserId(userId);
      if (!id) {
        showAlert("Error", "Invalid lesson ID.");
        router.push("/course");
        return;
      }

      if (!userId) {
        showAlert("Error", "You are not logged in.");
        router.push("/auth/signin");
        return;
      }

      const [lessonResponse, progressResponse] = await Promise.all([
        fetch(`http://localhost:3000/api/lesson/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json", "user-id": userId },
        }),
        fetch(`http://localhost:3000/api/progress/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
      ]);      

      if (!lessonResponse.ok || !progressResponse.ok) {
        throw new Error("Failed to fetch data.");
      }

      const lessonData = await lessonResponse.json();
      const userProgressData = await progressResponse.json();

      setLesson(lessonData);
      setUserChallengeProgress(userProgressData);

      const completed = lessonData.challenges.every((challenge: any) =>
        userProgressData.some(
          (progress: any) => progress.challengeId === challenge.id && progress.completed
        )
      );
      setIsLessonCompleted(completed);
    } catch (error) {
      console.error("Error fetching data:", error);
      showAlert("Error", "Failed to load lesson data.");
      router.push("/course");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!lesson || !userChallengeProgress) {
    router.push("/course");
    return null;
  }

  return (
    <View className="flex-1 bg-white">
      {lesson.lessonType === "QUIZ" ? (
        <Quiz
          lesson={{
            id: lesson.id,
            title: lesson.title,
            challenges: lesson.challenges.map((challenge: any) => ({
              ...challenge,
              challengeOptions: challenge.challengeOptions,
              completed: userChallengeProgress.some(
                (progress) => progress.challengeId === challenge.id && progress.completed
              ),
            })),
          }}
          isLessonCompleted={isLessonCompleted}
          userId={userId ? userId : ""}
        />
      ) : (
        <VideoPlayer
          lesson={{
            id: lesson.id,
            title: lesson.title,
            videoUrl: lesson.videoUrl,
          }}
          isLessonCompleted={isLessonCompleted}
        />
      )}
    </View>
  );
};

export default LessonPage;
