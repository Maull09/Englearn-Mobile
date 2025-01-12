import React, { useEffect, useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { FeedWrapper } from "@/components/FeedWrapper";
import { Header } from "./header";
import Unit from "./unit";
import { getUnits } from "@/db/data"; // Import units dari data.ts

interface UserProfile {
  userName: string;
  profileImageSrc: string | null;
  userId: string;
  email: string;
  password: string;
  activeUnitId: number | null;
}

const LearnPage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>({
    userName: "John Doe",
    profileImageSrc: null,
    userId: "1",
    email: "johndoe@example.com",
    password: "password123",
    activeUnitId: 1,
  });

  const dummyChallengeProgress = [
    { id: 1, challengeId: 1, userId: "1", completed: false },
  ];

  const [userChallengeProgress, setUserChallengeProgress] = useState(dummyChallengeProgress);
  const router = useRouter();
  const units = getUnits();

  useEffect(() => {
    // Jika userProfile tidak ada, alihkan ke halaman landing
    if (!userProfile) {
      Alert.alert(
        "User Profile Not Found",
        "Please set up your profile to continue."
      );
      router.push("/"); // Redirect ke halaman landing
    }
  }, [userProfile, router]);

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
