import { LogBox, View, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";
import Reviews from "../../components/BusinessDetail/Reviews";

// // Ignore the warning
// LogBox.ignoreLogs([
//   "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation",
// ]);

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetBusinessDetailById();
  }, []);

  // Used to get BusinessDetail by id
  const GetBusinessDetailById = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "BusinessList", businessid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setBusiness({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: "70%" }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        business && (
          <ScrollView>
            {/* Intro */}
            <Intro business={business} />

            {/* Action Buttons */}
            <ActionButton business={business} />

            {/* About Section */}
            <About business={business} />

            {/* Review Section */}
            <Reviews business={business} />
          </ScrollView>
        )
      )}
    </View>
  );
}
