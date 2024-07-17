import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function AddBusiness() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
    });
  }, []);
  
  const onImagePick = () => {
    
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
        Add New Business
      </Text>

      <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
        Fill all details in order to add new Business
      </Text>

      <TouchableOpacity onPress={() => onImagePick()} style={{ marginTop: 20 }}>
        <Image
          source={require("./../../assets/images/placeholder.png")}
          style={{ width: 100, height: 100 }}
        />
      </TouchableOpacity>
    </View>
  );
}
