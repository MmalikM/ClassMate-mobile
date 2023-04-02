import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailAsignmen from "../screens/DetailAsignmen";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { isLoggedIn } from "../stores/action/actionCreatorUser";
import Tabs from "./Tabs";

const Stack = createNativeStackNavigator();

export default function Stacks() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  async function cekStatus() {
    try {
      let cek = await AsyncStorage.getItem("access_token");
      console.log(cek);
      if (cek) dispatch(isLoggedIn(true));
    } catch (error) {
      console.log(error);
    }
  }

  const isLogged = useSelector((state) => state.login.loggedIn);

  useEffect(() => {
    cekStatus();
    isLogged ? navigation.navigate("Home") : navigation.navigate("Login");
  }, [isLogged]);

  console.log(isLogged);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLogged ? (
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name="Detail"
        component={DetailAsignmen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
