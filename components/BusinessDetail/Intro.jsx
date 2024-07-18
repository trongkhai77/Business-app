import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";

export default function Intro({ business }) {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const OnDelete = () => {
    Alert.alert(
      "Do you want to Delete?",
      "Do you really want to Delete this Business?",
      [
        {
          text: "Cancle",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteBusiness(),
        },
      ]
    );
  };

  const deleteBusiness = async () => {
    console.log("Delete Business");
    await deleteDoc(doc(db, "BusinessList", business?.id));
    router.back();
    ToastAndroid.show("Business Deleted!", ToastAndroid.LONG);
  };

  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          padding: 15,
          paddingTop: 35,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={32} color="white" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={32} color="white" />
      </View>
      <Image
        source={{ uri: business.imageUrl }}
        style={{ width: "100%", height: 340 }}
      />

      <View
        style={{
          padding: 15,
          marginTop: -20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontFamily: "outfit-bold",
            }}
          >
            {business.name}
          </Text>
          {user?.primaryEmailAddress?.emailAddress == business.userEmail ? (
            <TouchableOpacity onPress={() => OnDelete()}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          ) : null}
        </View>
        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
          {business.address}
        </Text>
      </View>
    </View>
  );
}
