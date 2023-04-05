import React, { useEffect, useState } from "react";
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
import { fetchAsignmens, fetchReturned } from "../stores/action/actionCreatorAsignmen";
import CardAssignment from "../components/CardAssignment";



export default function Dashboard() {
  const [status, setStatus] = useState(true)
  const navigation = useNavigation();
  const { asignmens } = useSelector((state) => state.asignmens);
  const dispatch = useDispatch();
  
  function changeStatus (set){
    if (set) setStatus(set)
    if(!set) setStatus(set)
  } 

  useEffect(() => {
    if(status) {
      dispatch(fetchAsignmens()).catch((error) => console.log(error));
    }else{
      dispatch(fetchReturned()).catch((error) => console.log(error));
    }
  }, [status]);
  // console.log(status);
  // console.log(asignmens);

  return (
    <View style={styles.container}>
      <View style={{flex:1, flexDirection:'row'}} >
        <TouchableOpacity style={{flex:1, backgroundColor:'#1B4965',borderRadius:20,margin:5}} onPress={()=>changeStatus(true)} >
          <View style={{justifyContent:'center', alignItems:'center', marginVertical:15}} >
            <Text style={{color:'#ffffff', fontWeight:'bold', fontSize:17}} >Assigned</Text> 
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1, backgroundColor:'#62B6CB', borderRadius:20,margin:5}} onPress={()=>changeStatus(false)} > 
            <View style={{justifyContent:'center', alignItems:'center', marginVertical:15}} >
            <Text style={{color:'#ffffff', fontWeight:'bold', fontSize:17}} >Returned</Text>
            </View>
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <FlatList
          data={asignmens}
          renderItem={({item})=> <CardAssignment item={item} status={status} />}
        
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
