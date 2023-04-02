import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Text, View,StyleSheet } from "react-native";
import { useEffect } from "react";

export default function Profile() {
  const navigation = useNavigation()
  function goHome(){
    navigation.navigate('Dashboard')
  }
  

  const logoutHandler =  () =>{
     AsyncStorage.clear().then(()=>navigation.replace('Login'))
  }


    return (
      <View style={styles.container}>
        <View style={{ flex: 1 , alignItems: "center",justifyContent: "center"}}>
          <Text>Profile Screen</Text>
          <Button title="back" onPress={() => goHome()}/>
          <Button title="delete" onPress={()=>logoutHandler()}/>

        </View>
      </View>

    );
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FCFFE7",
      flex: 1,
      padding: 20,
    },
  });
  