import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../../src/stores/action/actionCreatorUser"; // Import the login function

const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      // Use the login function instead of fetch
      const data = await login("email@example.com", "password");
      if (data) {
        setUserData(data);
      } else {
        console.log("Error fetching user data");
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

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
        <Text style={styles.value}>{userData.className}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={logout} />
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
