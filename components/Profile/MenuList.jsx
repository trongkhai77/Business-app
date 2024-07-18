import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Share,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function MenuList() {
  const { signOut } = useAuth();
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("./../../assets/images/add.png"),
      path: "business/add-business",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("./../../assets/images/business-and-trade.png"),
      path: "business/my-business",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("./../../assets/images/share_1.png"),
      path: "share",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("./../../assets/images/logout.png"),
      path: "logout",
    },
  ];

  const router = useRouter();

  const onMenuClick = (item) => {
    // if (item.path == "business/add-business") {
    //   router.push(item.path);
    // }
    // if (item.path == "business/my-business") {
    //   router.push(item.path);
    // }
    if (item.path == "logout") {
      Alert.alert(
        "Confirm Logout",
        "Are you sure you want to log out?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => signOut(),
          },
        ],
        { cancelable: false }
      );
    } else if (item.path == "share") {
      Share.share({
        message: "Download the Business Directory App by Kai!",
      });
    } else {
      router.push(item.path);
    }
  };

  return (
    <View style={{ marginTop: 100 }}>
      <FlatList
        numColumns={2}
        data={menuList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              padding: 10,
              borderRadius: 15,
              borderWidth: 1.5,
              margin: 10,
              backgroundColor: "#fff",
              borderColor: Colors.PRIMARY,
            }}
            onPress={() => onMenuClick(item)}
          >
            <Image source={item.icon} style={{ width: 50, height: 50 }} />
            <Text
              style={{ fontFamily: "outfit-medium", fontSize: 16, flex: 1 }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Text
        style={{
          fontFamily: "outfit",
          textAlign: "center",
          color: Colors.GRAY,
          marginTop: "75%",
        }}
      >
        Developed by Kai @ 2024
      </Text>
    </View>
  );
}
