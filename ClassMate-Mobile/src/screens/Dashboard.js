import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsignmens } from "../stores/action/actionCreatorAsignmen";
import CardAssignment from "../components/CardAssignment";

import logo from "../../assets/dashboard-icon.png"; // Update with your logo file name

export default function Dashboard() {
  const navigation = useNavigation();
  const { asignmens } = useSelector((state) => state.asignmens);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsignmens()).catch((error) => console.log(error));
  }, []);
  // console.log(asignmens);

  return (
    <View style={styles.container}>
      <View style={{flex:1, flexDirection:'row'}} >
        <View style={{flex:1, backgroundColor:'#1B4965',borderRadius:20,margin:5,}}>
          <View style={{justifyContent:'center', alignItems:'center', marginVertical:15}} >
            <Text style={{color:'#ffffff', fontWeight:'bold', fontSize:17}} >Returned</Text> 
          </View>
        </View>
        <View style={{flex:1, backgroundColor:'#62B6CB', borderRadius:20,margin:5}}>
        <View style={{justifyContent:'center', alignItems:'center', marginVertical:15}} >
        <Text style={{color:'#ffffff', fontWeight:'bold', fontSize:17}} >Assigned</Text>
          </View>
        </View>
      </View>
      <View style={styles.logoContainer}>
        <FlatList
          data={asignmens}
          renderItem={({item})=> <CardAssignment item={item}/>}
        
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  dmSerifDisplay: {
    fontFamily: 'DM Serif Display', // Use the font name without the file extension
  },
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: "flex-start",
    marginTop: 20,
    flex:10
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },

});
