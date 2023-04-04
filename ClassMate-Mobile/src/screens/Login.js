import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../stores/action/actionCreatorUser";
import classmateKecil from "../../assets/classmate-kecil.png";
import Icon from "react-native-vector-icons/FontAwesome5";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const [access_token, setAccess_token] = useState(null);
  const [user, setUser] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "456966576685-tg7e1pp8rav794qoa6e0c8737goviu4p.apps.googleusercontent.com",
    webClientId:
      "456966576685-uispq5qogfgcju4921hv4s4s6usoc3if.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setAccess_token(response.authentication.accessToken);
      access_token && fetchUserInfo();
    }
  }, [response, access_token]);

  const fetchUserInfo = async () => {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const userInfo = await response.json();
    setUser(userInfo);
  };

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async () => {
    try {
      const data = await dispatch(login(email, password));
      // console.log(data.data.access_token);
      setEmail("");
      setPassword("");
      navigation.navigate("Dashboard");
    } catch (error) {
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={classmateKecil}
        style={{
          width: screenWidth,
          height: newHeight,
          alignSelf: "center",
          marginBottom: 20,
        }}
      /> */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Image
          source={require("../../assets/iconic.png")}
          style={{ height: 200, width: 200 }}
        />
      </View>
      <SafeAreaView style={styles.formContainer}>
        <View style={styles.input}>
          <Text>
            <Icon
              name={"envelope"}
              size={30}
              color={"#bdbdbd"}
              style={{ elevation: 5 }}
            />
          </Text>
          <TextInput
            style={{ marginHorizontal: 20, elevation: 5 }}
            keyboardType="email-address"
            name="email"
            onChangeText={setEmail}
            placeholder="input email"
            value={email}
          />
        </View>
        <View style={styles.input}>
          <Text>
            <Icon name={"lock"} size={30} color={"#bdbdbd"} />
          </Text>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text>
              <Icon name={showPassword ? "eye-slash" : "eye"} size={24} />
            </Text>
          </TouchableOpacity>
          <TextInput
            name="password"
            style={{ marginHorizontal: 20 }}
            onChangeText={setPassword}
            placeholder="input password"
            secureTextEntry={!showPassword}
            value={password}
          />
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => submitLogin()}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        >
          <Text style={styles.buttonText}>google Login</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.registerButton}>Don't have account? </Text>
          <TouchableOpacity>
            <Text
              style={styles.registerText}
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    justifyContent: "center",
    flex: 0.6,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 12,
  },
  input: {
    flexDirection: "row",
    borderRadius: 15,
    height: 50,
    borderColor: "#1B4965",
    borderWidth: 2,
    padding: 10,
    marginTop: 20,
    marginHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "#62B6CB",
    paddingVertical: 14,
    marginTop: 15,
    marginHorizontal: 100,
    borderRadius: 15,
  },
  registerText: {
    color: "#1B4965",
    marginVertical: 14,
    marginBottom: 20,
    borderRadius: 15,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  registerButton: {
    color: "black",
    marginVertical: 14,
    marginBottom: 20,
    borderRadius: 15,
  },
  buttonText: {
    color: "#2f3e46",
    textAlign: "center",
    fontWeight: "bold",
  },
});
