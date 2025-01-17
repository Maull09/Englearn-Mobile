import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import ConfettiCannon from "react-native-confetti-cannon";
import { useRouter } from "expo-router";
import { showAlert, getCookie } from "@/utils/util";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
}

interface VideoPlayerProps {
  lesson: Lesson;
  isLessonCompleted: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ lesson, isLessonCompleted }) => {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [playing, setPlaying] = useState(false);

interface MarkLessonCompleteResponse {
    ok: boolean;
}

const markLessonComplete = async (lessonId: string): Promise<void> => {
    try {
        const userCookie = (await AsyncStorage.getItem("userData")) || getCookie("userData");
        const userID = userCookie ? JSON.parse(userCookie).userId : null;

        const response: MarkLessonCompleteResponse = await fetch(
            `https://englearn-backend.up.railway.app/api/progress/${userID}/lesson/${lessonId}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: true }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update lesson progress");
        }

        setShowConfetti(true);
        setTimeout(() => {
            router.push("/course");
        }, 3000);
    } catch (error) {
        console.error("Error marking lesson as complete:", error);
    }
};

  const onComplete = () => {
    setIsCompleted(true);
    markLessonComplete(lesson.id);
  };

  return (
    <View className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="mb-6">
        <Text className="text-xl font-bold text-center">{lesson.title}</Text>
      </View>

      {/* Video Player */}
      <View className="mb-6">
        {lesson.videoUrl ? (
          <YoutubePlayer
            height={220}
            play={playing}
            videoId={lesson.videoUrl.split("/").pop()!}
            onChangeState={(state) => {
              if (state === "ended") {
                onComplete();
              }
            }}
          />
        ) : (
          <Text className="text-center text-red-500">Video not available.</Text>
        )}
      </View>

      {/* Complete Button */}
      {isCompleted && (
        <TouchableOpacity
          className="bg-blue-500 py-3 rounded-md"
          onPress={onComplete}
        >
          <Text className="text-center text-white font-bold">Mark as Complete</Text>
        </TouchableOpacity>
      )}

      {/* Confetti */}
      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          fadeOut
          explosionSpeed={350}
        />
      )}
    </View>
  );
};

export default VideoPlayer;
