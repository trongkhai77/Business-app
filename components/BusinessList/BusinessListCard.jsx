import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function BusinessListCard({ business }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 25,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
      onPress={() => router.push("/businessdetail/" + business.id)}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{ width: 120, height: 120, borderRadius: 15 }}
      />

      <View style={{ flex: 1, gap: 7 }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            color: Colors.PRIMARY,
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{ fontFamily: "outfit", color: Colors.GRAY, fontSize: 15 }}
        >
          {business.address}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
          }}
        >
          <Image
            source={require("./../../assets/images/star.png")}
            style={{ width: 15, height: 15 }}
          />
          <Text style={{ fontFamily: "outfit" }}>5.0</Text>
        </View>
        {/* <Text>{business.id}</Text> */}
      </View>
    </TouchableOpacity>
  );
}
