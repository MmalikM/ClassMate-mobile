import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Button } from "react-native";

const Profile = () => {
  const navigation = useNavigation();

  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Student",
    address: "123 Main Street, City, Country",
    className: "Math 101",
  };

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
        <Button title="Back" onPress={() => navigation.navigate("Home")} />
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
