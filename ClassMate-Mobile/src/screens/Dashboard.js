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
      <View style={{flex:2}} >

      </View>
      <View style={styles.logoContainer}></View>
      <FlatList
        data={asignmens}
        renderItem={({item})=> <CardAssignment item={item}/>}
        numColumns={2}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  dmSerifDisplay: {
    fontFamily: 'DM Serif Display', // Use the font name without the file extension
  },
  container: {
    backgroundColor: "#FCFFE7",
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: "flex-start",
    marginBottom: 10,
    flex:10
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  asignmensContainer: {
    flex: 1,
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
