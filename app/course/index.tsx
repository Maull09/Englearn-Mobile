import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { FeedWrapper } from "@/components/FeedWrapper";
import { Header } from "./header";
import Unit from "./unit";
import {
  getUnits,
  getUserProfile,
  getUserChallengeProgress,
} from "@/db/queries";

interface UserProfile {
  userName: string;
  profileImageSrc: string | null;
  userId: string;
  email: string;
  password: string;
  activeUnitId: number | null;
}

const LearnPage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  interface Lesson {
    completed: boolean;
    id: number;
    title: string;
    order: number;
    unitId: number;
    lessonType: "QUIZ" | "VIDEO";
    videoUrl: string | null;
    challenges: {
      id: number;
      order: number;
      lessonId: number;
      question: string;
      challengeProgress: {
        id: number;
        completed: boolean;
        challengeId: number;
      }[];
    }[];
  }
  
  interface Unit {
    id: number;
    title: string;
    description: string;
    order: number;
    lessons: Lesson[];
  }
  
  const [units, setUnits] = useState<Unit[]>([]);
  interface ChallengeProgress {
    id: number;
    challengeId: number;
    userId: string;
    completed: boolean;
  }
  
  const [userChallengeProgress, setUserChallengeProgress] = useState<ChallengeProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile, units, and challenge progress
        const [profile, fetchedUnits, fetchedProgress] = await Promise.all([
          getUserProfile(),
          getUnits(),
          getUserChallengeProgress(),
        ]);

        if (!profile) {
        //   Alert.alert(
        //     "User Profile Not Found",
        //     "Please set up your profile to continue."
        //   );
        //   router.push("/"); // Redirect to landing page
          return;
        }

        console.log("Fetched data:", profile, fetchedUnits, fetchedProgress);
        setUserProfile(profile);
        setUnits(fetchedUnits);
        setUserChallengeProgress(fetchedProgress ?? []);
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

//   if (loading) {
//     return (
//       <View className="flex-1 items-center justify-center bg-white">
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-white px-4"
    >
      {/* Feed Wrapper */}
      <FeedWrapper>
        {/* Header */}
        {userProfile && (
          <Header
            title="English Course"
            userName={userProfile.userName}
            profileImageSrc={userProfile.profileImageSrc ?? "/book_5221784.png"}
          />
        )}

        {/* Units */}
        {units.map((unit) => (
          <View key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              userChallengeProgress={userChallengeProgress}
            />
          </View>
        ))}
      </FeedWrapper>
    </ScrollView>
  );
};

export default LearnPage;