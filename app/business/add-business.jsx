import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { db, storage } from "./../../configs/FirebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export default function AddBusiness() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [website, setWebsite] = useState();
  const [about, setAbout] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
      headerTitleStyle: {
        fontFamily: "outfit-bold",
        color: "#000",
      },
      headerTintColor: Colors.PRIMARY,
    });
    GetCategoryList();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    setImage(result?.assets[0]?.uri);
  };

  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      //   console.log(doc.data());
      setCategoryList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ]);
    });
  };

  const onAddNewBusiness = async () => {
    const fileName = Date.now().toString() + ".jpg";
    const resp = await fetch(image);
    const blob = await resp.blob();

    const imageRef = ref(storage, "business-app/" + fileName);

    uploadBytes(imageRef, blob).then((snapshot) => {
      console.log("File uploaded...");
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
        Add New Business
      </Text>

      <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
        Fill all details in order to add new Business
      </Text>

      <TouchableOpacity
        onPress={() => onImagePick()}
        style={{ marginTop: 20, width: 100 }}
      >
        {!image ? (
          <Image
            source={require("./../../assets/images/placeholder.png")}
            style={{ width: 100, height: 100 }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 15 }}
          />
        )}
      </TouchableOpacity>

      <View>
        <TextInput
          placeholder="Name"
          onChangeText={(v) => setName(v)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 16,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="Address"
          onChangeText={(v) => setAddress(v)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 16,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="Contact"
          onChangeText={(v) => setContact(v)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 16,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          placeholder="Website"
          onChangeText={(v) => setWebsite(v)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 16,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        />
        <TextInput
          multiline
          numberOfLines={5}
          placeholder="About"
          onChangeText={(v) => setAbout(v)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 16,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
            height: 100,
          }}
        />

        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginTop: 10,
            borderColor: Colors.PRIMARY,
            fontFamily: "outfit",
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => setCategory(value)}
            items={categoryList}
          />
        </View>
      </View>

      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={() => onAddNewBusiness()}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "outfit-medium",
            color: "#fff",
          }}
        >
          Add New Business
        </Text>
      </TouchableOpacity>
    </View>
  );
}
