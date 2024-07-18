import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import BusinessListCard from "./../../components/BusinessList/BusinessListCard";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function MyBusiness() {
  const { user } = useUser();
  const [businessList, setBusinessList] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const GetUserBusiness = async () => {
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
    setLoading(false);
  };

  useEffect(() => {
    user && GetUserBusiness();
  }, [user]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "My Business",
      headerShown: true,
      headerTitleStyle: {
        fontFamily: "outfit-bold",
        color: "#000",
      },
      headerTintColor: Colors.PRIMARY,
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.PRIMARY}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : businessList.length > 0 ? (
        <FlatList
          data={businessList}
          onRefresh={GetUserBusiness}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinessListCard business={item} key={index} />
          )}
        />
      ) : (
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 25,
            color: Colors.GRAY,
            textAlign: "center",
            marginTop: "50%",
          }}
        >
          No Business Found
        </Text>
      )}
    </View>
  );
}
