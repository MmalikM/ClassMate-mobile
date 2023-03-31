
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import DetailAsignmen from '../screens/DetailAsignmen';

const Stack = createNativeStackNavigator();

export default function Stacks() {
  return (
    <Stack.Navigator initialRouteName='Dashboard'>
    <Stack.Screen name="Home" component={Dashboard} options={{headerShown:false,}} />
    <Stack.Screen name="Detail" component={DetailAsignmen} options={{headerShown:false,}}/>
    </Stack.Navigator>
  );
}
