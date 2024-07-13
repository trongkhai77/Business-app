import { View, Text, Image } from "react-native";
import React from "react";

export default function BusinessListCard({ business }) {
  return (
    <View>
      <Image
        source={{ uri: business?.imageUrl }}
        style={{
          width: "100%",
          height: 300,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 24 }}>
          {business?.name}
        </Text>
        <Text style={{ fontFamily: "outfit" }}>{business?.address}</Text>
      </View>
    </View>
  );
}
