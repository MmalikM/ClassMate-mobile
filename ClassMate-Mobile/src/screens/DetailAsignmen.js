import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsignmensById } from "../stores/action/actionCreatorAsignmen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import classmateKecil from "../../assets/classmate-kecil.png";
import { Dimensions } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default function DetailAsignmen({ route }) {
  const [image,setImage] = useState(null)
  const { detailAsignmen } = useSelector((state) => state.asignmens);
  const { id } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const screenWidth = Dimensions.get("window").width;
  const aspectRatio = 0.15
; // The original height (50) divided by the original width (200)
  const newHeight = screenWidth * aspectRatio;


  async function getAccessToken() {
    try {
      const token = await AsyncStorage.getItem("access_token");
      // console.log(token);
      return token;
    } catch (error) {
      console.log(error);
    }
  }
// upload image


  // useEffect( ()=>{
  //   getImage()
  // },[])

  // const getImage = async () =>{
  //   try {
  //     if(Platform.OS !== 'web'){
  //       const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
  //       if (status !== 'granted') console.log("permition denied");
  //     }
  //   } catch (error) {
  //     console.log(error); 
  //   }
  // }

  const pickImage = async ()=>{
    console.log("masuk bro");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  useEffect(() => {
    dispatch(fetchAsignmensById(id));
    getAccessToken();
  }, []);

  if (!detailAsignmen || !detailAsignmen.ClassId) {
    return <Text>Loading...</Text>;
  }
console.log(image);

  return (
    <View style={styles.container}>
      <Image
        source={classmateKecil}
        style={{
          width: screenWidth,
          height: newHeight,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />
      <Text style={styles.title}>{detailAsignmen.name}</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{detailAsignmen.name}</Text>
        <Text style={styles.cardText}>Subject: {detailAsignmen.subject}</Text>
        <Text style={styles.cardText}>
          Class: {detailAsignmen.ClassId.name}
        </Text>
        <Text style={styles.cardText}>
          Assignment Date:{" "}
          {new Date(detailAsignmen.assignmentDate).toLocaleDateString()}
        </Text>
        <Text style={styles.cardText}>
          Deadline: {new Date(detailAsignmen.deadline).toLocaleDateString()}
        </Text>
      </View>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <View style={styles.buttonContainer}>
        <Button title="upload file" onPress={pickImage}/>
        {image && <Image source={{uri:image}} style={{width:200, height:200}} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FCFFE7",
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
