import React, { useEffect, useState } from "react";
import { View, ScrollView, Alert, ActivityIndicator, Text } from "react-native";
import { useRouter } from "expo-router";
import { FeedWrapper } from "@/components/FeedWrapper";
import { Header } from "./header";
import Unit from "./unit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showAlert, getCookie } from "@/utils/util";

interface UserProfile {
  userName: string;
  profileImageSrc: string | null;
  userId: string;
  email: string;
  activeUnitId: number | null;
}

interface ChallengeProgress {
  id: number;
  challengeId: number;
  userId: string;
  completed: boolean;
}

interface UnitData {
  id: number;
  order: number;
  description: string;
  title: string;
  lessons: {
    id: number;
    title: string;
    challenges: { id: number }[];
  }[];
}

const LearnPage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userChallengeProgress, setUserChallengeProgress] = useState<
    ChallengeProgress[]
  >([]);
  const [units, setUnits] = useState<UnitData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch data only once
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve user data
        const userDataString =
          (await AsyncStorage.getItem("userData")) || getCookie("userData");
        if (!userDataString) {
          Alert.alert("Error", "User data not found in storage.");
          throw new Error("User data not found in storage.");
        }
        const userData = JSON.parse(userDataString);
        const userId = userData?.userId;

        if (!userId) {
          Alert.alert("Error", "User ID is missing. Redirecting to sign-in.");
          throw new Error("User ID is missing");
        }

        console.log("UserID:", userId);

        // Fetch user profile
        const profileResponse = await fetch(
          `https://englearn-backend.up.railway.app/api/auth/profile/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!profileResponse.ok) {
          Alert.alert("Error", "Failed to fetch user profile.");
          throw new Error("Failed to fetch user profile");
        }
        const profileData = await profileResponse.json();
        console.log("UserProfile:", profileData);
        setUserProfile(profileData);

        // Fetch units
        const unitsResponse = await fetch(
          "https://englearn-backend.up.railway.app/api/units",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "user-id": userId,
            },
          }
        );

        if (!unitsResponse.ok) {
          Alert.alert("Error", "Failed to fetch units.");
          throw new Error("Failed to fetch units");
        }
        const unitsData = await unitsResponse.json();
        console.log("Units:", unitsData);
        setUnits(unitsData);

        // Fetch challenge progress
        const progressResponse = await fetch(
          `https://englearn-backend.up.railway.app/api/progress/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!progressResponse.ok) {
          Alert.alert("Error", "Failed to fetch user progress.");
          throw new Error("Failed to fetch user progress");
        }
        const progressData = await progressResponse.json();
        console.log("User Progress:", progressData);
        setUserChallengeProgress(progressData);
      } catch (error) {
        console.error("Error in fetchData:", error);
        const errorMessage = error instanceof Error ? error.message : "Something went wrong.";
        Alert.alert("Error", errorMessage);
        router.push("/auth/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!userProfile) {
    Alert.alert(
      "User Profile Not Found",
      "Please set up your profile to continue."
    );
    router.push("/"); // Redirect to landing page
    return null;
  }

  if (units.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>No units found. Please check your internet connection.</Text>
      </View>
    );
  }
  
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-white px-4"
      showsVerticalScrollIndicator={false}
    >
      <FeedWrapper>
        {userProfile && (
          <Header
            title="English Course"
            userName={userProfile.userName}
            profileImageSrc={userProfile.profileImageSrc ?? "/book_5221784.png"}
          />
        )}
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
