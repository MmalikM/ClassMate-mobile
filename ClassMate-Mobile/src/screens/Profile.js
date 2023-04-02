import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Text, View,StyleSheet } from "react-native";




export default function Profile() {

  const navigation = useNavigation()

  const logoutHandler = async () =>{
    await AsyncStorage.clear();
    navigation.navigate('Login')
  }

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 , alignItems: "center",justifyContent: "center"}}>
          <Text>Profile Screen</Text>
          <Button title="back" onPress={() => navigation.navigate('Home')}/>
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
  