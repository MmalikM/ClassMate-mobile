import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Stacks from "./Stacks";
import Ionicons from "react-native-vector-icons/Ionicons";

import dashboardIcon from "../../assets/classs.png";
import { Image } from "react-native";
import Statistik from "../screens/Statistik";

const { Navigator, Screen } = createBottomTabNavigator();

export default function Tabs() {

  return (
    <Navigator
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Dashboard") {
              iconName = focused ? "home-sharp" : "home-outline";
            } else if (route.name === "Statistik") {
              iconName = focused ? "stats-chart" : "stats-chart-outline";
            } else if(route.name === "Profile"){
              iconName = focused ? "people-sharp" : "people-outline";

            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        };
      }}
    >

      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: () => (
            <Image source={dashboardIcon} style={{ width: 200, height: 43 }} />
          ),
          headerStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      />
      <Screen
        name="Statistik"
        component={Statistik}
        options={{
          headerTitle: () => (
            <Image source={dashboardIcon} style={{ width: 200, height: 43 }} />
          ),
          headerStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: () => (
            <Image source={dashboardIcon} style={{ width: 200, height: 43 }} />
          ),
          headerStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      />
     
    </Navigator>
  );
}