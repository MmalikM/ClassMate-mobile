import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, logout } from "../../src/stores/action/actionCreatorUser"; // Import the login function
import { useDispatch } from "react-redux";
import axios from "axios";

const baseUrl = "http://localhost:3000/students/"

const Profile = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [totalAssignments, setTotalAssingments] = useState(0);

  const fetchUserData = async () => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      console.log(access_token);
      const {data} = await axios.get(baseUrl+'profile',{
        headers:{
          access_token : access_token
        }
      })
      setTotalAssingments(data.Class.Assignments.length);
      setUserData(data)
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

 async function logoutHandler(){
  try {
    await  dispatch(logout())
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
      <Text style={styles.title}>PROFILE</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{userData.name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userData.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Role:</Text>
        <Text style={styles.value}>{userData.role}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{userData.address}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Class:</Text>
        <Text style={styles.value}>{userData.Class.name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total Assignments:</Text>
        <Text style={styles.value}>{totalAssignments}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={()=>logoutHandler()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
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
