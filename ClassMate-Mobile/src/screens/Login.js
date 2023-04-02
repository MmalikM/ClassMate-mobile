import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../stores/action/actionCreatorUser";

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async () => {
    try {
      // const data = await dispatch(login(email,password))
      // await AsyncStorage.setItem('access_token',data.access_token)
      // const token = await AsyncStorage.getItem('access_token');
      // setEmail('')
      // setPassword('')

      await dispatch(login(email, password));
      navigation.push("Home");

      console.log({ email, password });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={{ flex: 8, backgroundColor: "pink" }}>
        <SafeAreaView>
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
          style={{
            backgroundColor: "blue",
            paddingVertical: 14,
            margin: 20,
            borderRadius: 15,
          }}
          onPress={() => submitLogin()}
        >
          <Text style={{ color: "#FFFFFF", textAlign: "center" }}>login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            paddingVertical: 14,
            margin: 20,
            borderRadius: 15,
          }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
            register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FCFFE7",
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
