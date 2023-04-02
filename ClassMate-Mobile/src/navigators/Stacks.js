import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import Dashboard from '../screens/Dashboard';
import DetailAsignmen from '../screens/DetailAsignmen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator();

export default function Stacks() {
  const navigation = useNavigation()
  const [isLogin,setIsLogin] = useState(false)

  async function cekStatus(){
    try {
      let cek = await AsyncStorage.getItem('access_token')
      console.log(cek);
      if(cek) setIsLogin(true)
    } catch (error) {
      console.log(object);
    }
  }
  useEffect(()=>{
     cekStatus()
     isLogin? navigation.navigate('Home'):navigation.navigate('Login') 
  },[isLogin])

  console.log(isLogin);
  return (
    <Stack.Navigator  screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Tabs} options={{headerShown:false,}} /> 
      <Stack.Screen name="Login" component={Login} options={{headerShown:false,}}/> 
      <Stack.Screen name="Detail" component={DetailAsignmen} options={{headerShown:false,}}/>
      <Stack.Screen name="Register" component={Register} options={{headerShown:false,}}/> 

    </Stack.Navigator>

  );
}
