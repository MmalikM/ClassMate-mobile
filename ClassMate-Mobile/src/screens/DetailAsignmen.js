import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsignmensById, uploadImage } from "../stores/action/actionCreatorAsignmen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import classmateKecil from "../../assets/classmate-kecil.png";
import { Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import axios from "axios";
import * as FileSystem from 'expo-file-system';

export default function DetailAsignmen({ route }) {
  const URL = "http://localhost:3000/students/upload/"
  const [image, setImage] = useState(null);
  const { detailAsignmen } = useSelector((state) => state.asignmens);
  const { id } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const screenWidth = Dimensions.get("window").width;
  const aspectRatio = 0.15; // The original height (50) divided by the original width (200)
  const newHeight = screenWidth * aspectRatio;

  async function getAccessToken() {
    try {
      const token = await AsyncStorage.getItem("access_token");
      return token;
    } catch (error) {
      console.log(error);
    }
  }

  // const pickImage = async () => {
  //   // console.log("masuk bro");
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0]);
  //   }
  // };

  const pickImage = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
  
    if (!result.cancelled) {
      // Save the selected image to the app's cache directory
      const fileUri = FileSystem.cacheDirectory + result.uri.split('/').pop();
      await FileSystem.writeAsStringAsync(fileUri, result.base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setImage(result.assets[0]);
      // Create a FormData object and append the image file to it
      const formData = new FormData();
      formData.append('image', {
        uri: fileUri,
        type: 'image/jpeg',
        name: 'test.jpg',
      });
  
      // Send a POST request to the server to upload the file
      axios.post(URL+id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token:access_token
        },
      })
        .then((response) => {
          console.log('Upload successful!');
          console.log(response);
        })
        .catch((error) => {
          console.log('Error uploading file:', error);
        });
    }
  };

  // const uploadImage = async () => {
  //   const access_token = await AsyncStorage.getItem("access_token");
  //   const formData = new FormData()
  //   formData.append('image',image)
  //   console.log(formData);
  //   const option = {
  //     headers: {
  //           'Content-Type': 'multipart/form-data',
  //           // access_token:access_token
  //         }
  //   }
  //   try {
  //     const {data} = await axios.post(URL+id, formData,option)
  //     // await axios({
  //     //   url: URL + id,
  //     //   method: 'POST',
  //     //   body: formData,
  //     //   headers: {
  //     //     'Content-Type': 'multipart/form-data',
  //     //     access_token:access_token
  //     //   }
  //     // })
  //     console.log(data);
  //     console.log("Uploaded")
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // function submitPict(){
  //     dispatch(uploadImage(image,id));
  // }

  useEffect(() => {
    dispatch(fetchAsignmensById(id));
    getAccessToken();
  }, []);
  // useEffect(() => {
  //   console.log(image);
  //   dispatch(uploadImage(image,id));
  // }, [image]);

  if (!detailAsignmen || !detailAsignmen?.ClassId) {
    return <Text>Loading...</Text>;
  }

  // console.log(image);

  return (
    <View style={styles.container}>
     
      <Text style={styles.title}>{detailAsignmen?.name}</Text>
      <View style={styles.card}>
  
        <Text style={styles.cardText}>Subject: {detailAsignmen?.subject}</Text>
        <Text style={styles.cardText}>
          Class: {detailAsignmen?.ClassId?.name}
        </Text>
        <Text style={styles.cardText}>
          Assignment Date:{" "}
          {new Date(detailAsignmen?.assignmentDate).toLocaleDateString()}
        </Text>
        <Text style={styles.cardText}>
          Deadline: {new Date(detailAsignmen?.deadline).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={pickImage}>
        <Text style={styles.ButtonText}>Upload Your Answer</Text>
      </TouchableOpacity>
      <View style={styles.imagePos}>
        {image && (
          <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />
        )}
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={pickImage}>
        <Text style={styles.ButtonText}>submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop:50
  },
  card: {
    backgroundColor: "#CAE9FF",
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
  buttonContainer: {
    backgroundColor: "#1B4965",
    paddingVertical: 14,
    marginTop: 15,
    marginHorizontal: 100,
    borderRadius: 15,
  },
  ButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  imagePos: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    width: 210,
    height: 210,
   margin:100,
   borderWidth:5,
   borderColor:'#62B6CB'
  },
});
