import { useNavigation } from "@react-navigation/native";
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

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = () =>{
    
  }

  return (
    <View style={[styles.container]}>
      <View style={{ flex: 8, backgroundColor: "pink" }}>
        <SafeAreaView>
          <TextInput
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
        >
          <Text style={{ color: "#FFFFFF", textAlign: "center" }}>login</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Login Screen</Text>
        <Button title="back" onPress={() => navigation.navigate("Home")} />
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
