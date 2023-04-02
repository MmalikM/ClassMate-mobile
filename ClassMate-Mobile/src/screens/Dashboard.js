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
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsignmens } from "../stores/action/actionCreatorAsignmen";
import logo from "../../assets/dashboard-icon.png"; // Update with your logo file name

export default function Dashboard() {
  const navigation = useNavigation();
  const { asignmens } = useSelector((state) => state.asignmens);
  const dispatch = useDispatch();

  function goToDetail(id){
    navigation.navigate('Detail',{id})
  }

  useEffect(() => {
    dispatch(fetchAsignmens()).catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}></View>
      <ScrollView style={styles.asignmensContainer}>
        {asignmens?.map((asignmen, index) => {
          return (
            <TouchableOpacity key={index} onPress={()=> goToDetail(asignmen._id) } >
              <View  style={styles.card} >
                <Text style={styles.asignmenName}>{asignmen.name}</Text>
                <Text style={styles.asignmenClassId}>{asignmen.subject}</Text>
              </View>  
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FCFFE7",
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: "flex-start",
    marginBottom: 10,
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
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  asignmenName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  asignmenClassId: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
