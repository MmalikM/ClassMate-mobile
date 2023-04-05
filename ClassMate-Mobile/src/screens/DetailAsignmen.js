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
import { Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';


export default function DetailAsignmen({ route }) {
  const URL = "http://localhost:3000/students/upload/"
  const [document,setDocument] = useState(null)
  const [image, setImage] = useState(null);
  const [res, setRes] = useState(null);
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
  
  // const pickDocument = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({});
     
  //     if (!result.cancelled) {
  //       setRes(result)
  //       console.log(result);
  //       // do something with the selected document
  //     }
  //   } catch (error) {
  //     console.log('Error picking document:', error);
  //   }
  // };
  // const uploadImage = async () => {
  //   const access_token = await AsyncStorage.getItem("access_token"); 
  //   const formData = new FormData();
  //   formData.append('image', {
  //     uri: res.uri,
  //     type: 'application/pdf',
  //     name: 'test.pdf',
  //   });

  //   // Send a POST request to the server to upload the file
  //   axios.post(URL+id, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       access_token:access_token
  //     },
  //   })
  //     .then((response) => {
  //       console.log('Upload successful!');
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log('Error uploading file:', error);
  //     });
    
  // }


  const pickImage = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6,9],
      quality: 1,
      base64: true,
    });
  
    if (!result.cancelled) { 
      setImage(result.assets[0]);
      setRes(result)
     
    }
  };

  const uploadImage = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    const fileUri = FileSystem.cacheDirectory + res.uri.split('/').pop();
    await FileSystem.writeAsStringAsync(fileUri, res.base64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    
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


  useEffect(() => {
    dispatch(fetchAsignmensById(id));
    getAccessToken();
  }, []);

  if (!detailAsignmen || !detailAsignmen?.ClassId) {
    return <Text>Loading...</Text>;
  }


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
      <View style={{flexDirection:'row', justifyContent:'center'}}>
      <TouchableOpacity style={styles.buttonContainer} onPress={pickImage}>
        <Text style={styles.ButtonText}>Upload Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={uploadImage}>
        <Text style={styles.ButtonText}>submit</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.imagePos}>
        {/* {image && (
          <Image source={{ uri: res.uri }} style={{ width: 200, height: 288 }} />
        )} */}
      </View>
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
    borderRadius: 10,
    marginHorizontal:10
  },
  ButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    marginHorizontal:10
  },
  imagePos: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    width: 210,
    height: 297,
    margin:100,
    borderWidth:5,
     borderColor:'#62B6CB'
  },
});
