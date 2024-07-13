import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Intro({ business }) {
  const router = useRouter();

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
        <Text style={{ fontSize: 24, fontFamily: "outfit-bold" }}>
          {business.name}
        </Text>
        <Text style={{ fontFamily: "outfit", fontSize: 16 }}>
          {business.address}
        </Text>
      </View>
    </View>
  );
}
