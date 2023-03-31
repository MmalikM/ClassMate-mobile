import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import Ionicons from "react-native-vector-icons/Ionicons";
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Stacks from './Stacks'



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
            } else if (route.name === "Profile") {
              iconName = focused ? "heart-sharp" : "heart-outline";
            } else if (route.name === "Login") {
              iconName = focused ? "basket-sharp" : "basket-outline";
            } else if (route.name === "Register") {
              iconName = focused
                ? "person-circle-sharp"
                : "person-circle-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        };
      }}
    >
      <Screen name="Dashboard" component={Stacks} />
      <Screen name="Profile" component={Profile} />
      <Screen name="Login" component={Login} />
      <Screen name="Register" component={Register} />
    </Navigator>
  );
}


