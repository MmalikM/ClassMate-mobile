import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsignmensById } from "../stores/action/actionCreatorAsignmen";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function DetailAsignmen({route}) {
  const { detailAsignmen } = useSelector((state) => state.asignmens);
  const {id} = route.params
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  // Mendapatkan access_token
  async function getAccessToken() {
    try {
      const token = await AsyncStorage.getItem('access_token');
      console.log(token);
      return token;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    dispatch(fetchAsignmensById(id))
    getAccessToken()
  },[])


  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Detail Asignmen Screen {id}</Text>
        <Text>{JSON.stringify(detailAsignmen)}</Text>
        <Button title="back" onPress={() => navigation.navigate("Home")} />
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
