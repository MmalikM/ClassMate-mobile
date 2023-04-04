import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Button,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, logout } from "../../src/stores/action/actionCreatorUser"; // Import the login function
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5";
import { fetchAsignmens } from "../stores/action/actionCreatorAsignmen";

const baseUrl =
  "https://ff1d-2001-448a-1129-129b-b019-1ebb-37b9-9dd6.ap.ngrok.io/students/";

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [totalAssignments, setTotalAssingments] = useState(0);
  const { asignmens } = useSelector((state) => state.asignmens);

  const fetchUserData = async () => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      console.log(access_token);
      const { data } = await axios.get(baseUrl + "profile", {
        headers: {
          access_token: access_token,
        },
      });
      setUserData(data);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    dispatch(fetchAsignmens());
    setTotalAssingments(asignmens.length);
  }, []);

  async function logoutHandler() {
    try {
      await dispatch(logout());
      navigation.push("Login");
    } catch (error) {
      console.log(error);
    }
  }

  // const logout = async () => {
  //   try {
  //     await AsyncStorage.removeItem("access_token");
  //     navigation.navigate("Login");
  //   } catch (error) {
  //     console.log("Error logging out:", error);
  //   }
  // };

  if (!userData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "pink" }}>
        <Image
          source={{
            uri: "https://t4.ftcdn.net/jpg/02/03/27/53/360_F_203275317_FjB3VUNQ085ja7opvp27ue0pViq1bAIg.jpg",
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={{ flex: 2, backgroundColor: "#ffffff" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={{
              uri: "https://asianwiki.com/images/5/5e/Kim_So-Hyun-1999-p001.jpeg",
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              position: "absolute",
              borderColor: "#ffffff",
              borderWidth: 4,
              zIndex: 2,
            }}
          />
        </View>
        <View
          style={{
            ustifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 18 }}>
            {userData.name}
          </Text>
          <Text style={{ marginTop: 2, fontStyle: "italic", fontSize: 12 }}>
            {userData.role}
          </Text>
        </View>
        <View style={{ marginHorizontal: 100 }}>
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <Text>
              <Icon
                name={"envelope"}
                size={30}
                color={"#bdbdbd"}
                style={{ elevation: 5 }}
              />
            </Text>
            <View style={{ justifyContent: "center", marginLeft: 20 }}>
              <Text>{userData.email}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text>
              <Icon
                name={"school"}
                size={30}
                color={"#bdbdbd"}
                style={{ elevation: 5 }}
              />
            </Text>
            <View style={{ justifyContent: "center", marginLeft: 13 }}>
              <Text>{userData.Class.name}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text>
              <Icon
                name={"map-marker-alt"}
                size={30}
                color={"#bdbdbd"}
                style={{ elevation: 5 }}
              />
            </Text>
            <View style={{ justifyContent: "center", marginLeft: 25 }}>
              <Text>{userData.address}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text>
              <Icon
                name={"list-alt"}
                size={30}
                color={"#bdbdbd"}
                style={{ elevation: 5 }}
              />
            </Text>
            <View style={{ justifyContent: "center", marginLeft: 18 }}>
              <Text>{totalAssignments} Assignments</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Logout" onPress={() => logoutHandler()} />
        </View>
        <View
          style={{ flexDirection: "row", marginTop: 30, marginHorizontal: 20 }}
        >
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>
              <Icon name="facebook" size={25} color="#bdbdbd" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>
              <Icon name="instagram" size={25} color="#bdbdbd" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>
              <Icon name="twitter" size={25} color="#bdbdbd" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>
              <Icon name="tiktok" size={25} color="#bdbdbd" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={()=>logoutHandler()} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    padding: 10,
    backgroundColor: "#FCFFE7",
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
    padding: 15,
    width: "100%",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 30,
  },
});

export default Profile;
