import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsignmens } from "../stores/action/actionCreatorAsignmen";
import logo from "../../assets/dashboard-icon.png"; // Update with your logo file name

export default function Dashboard() {
  const { asignmens } = useSelector((state) => state.asignmens);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsignmens()).catch((error) => console.log(error));
  }, []);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        
      </View>
      <ScrollView style={styles.asignmensContainer}>
        {asignmens?.map((asignmen, index) => {
          return (
            <View key={index} style={styles.card}>
              <Text style={styles.asignmenName}>{asignmen.name}</Text>
              <Text style={styles.asignmenClassId}>{asignmen.ClassId}</Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Text>Detail Asignmen Screen</Text>
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
