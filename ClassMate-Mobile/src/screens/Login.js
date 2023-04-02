import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../stores/action/actionCreatorUser";
import classmateKecil from "../../assets/classmate-kecil.png";

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async () => {
    try {
      const data = await dispatch(login(email, password));
      await AsyncStorage.setItem("access_token", data.access_token);
      const token = await AsyncStorage.getItem("access_token");
      setEmail("");
      setPassword("");
      navigation.push("Home");
    } catch (error) {
      throw error;
    }
  };

  const screenWidth = Dimensions.get("window").width;
  const aspectRatio = 0.15;
  const newHeight = screenWidth * aspectRatio;

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
      <SafeAreaView style={styles.formContainer}>
          <TextInput
            keyboardType="email-address"
            name="email"
            style={styles.input}
            onChangeText={setEmail}
            placeholder="input email"
            value={email}
          />
          <TextInput
            name="password"
            style={styles.input}
            onChangeText={setPassword}
            placeholder="input password"
            keyboardType="numeric"
            value={password}
          />
        </SafeAreaView>
        <TouchableOpacity
        style={styles.loginButton}
        onPress={() => submitLogin()}
      >
        <Text style={styles.buttonText}>login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>register</Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FCFFE7",
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  loginButton: {
    backgroundColor: "blue",
    paddingVertical: 14,
    marginBottom: 10,
    borderRadius: 15,
  },
  registerButton: {
    backgroundColor: "blue",
    paddingVertical: 14,
    marginBottom: 20,
    borderRadius: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});
