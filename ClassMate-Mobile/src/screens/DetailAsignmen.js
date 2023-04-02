import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsignmensById } from "../stores/action/actionCreatorAsignmen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import classmateKecil from "../../assets/classmate-kecil.png";
import { Dimensions } from "react-native";

export default function DetailAsignmen({ route }) {
  const { detailAsignmen } = useSelector((state) => state.asignmens);
  const { id } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const screenWidth = Dimensions.get("window").width;
  const aspectRatio = 0.15
; // The original height (50) divided by the original width (200)
  const newHeight = screenWidth * aspectRatio;

  async function getAccessToken() {
    try {
      const token = await AsyncStorage.getItem("access_token");
      // console.log(token);
      return token;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(fetchAsignmensById(id));
    getAccessToken();
  }, []);

  if (!detailAsignmen || !detailAsignmen.ClassId) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={classmateKecil}
        style={{
          width: screenWidth,
          height: newHeight,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />
      <Text style={styles.title}>Detail Asignmen Screen {id}</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{detailAsignmen.name}</Text>
        <Text style={styles.cardText}>Subject: {detailAsignmen.subject}</Text>
        <Text style={styles.cardText}>
          Class: {detailAsignmen.ClassId.name}
        </Text>
        <Text style={styles.cardText}>
          Assignment Date:{" "}
          {new Date(detailAsignmen.assignmentDate).toLocaleDateString()}
        </Text>
        <Text style={styles.cardText}>
          Deadline: {new Date(detailAsignmen.deadline).toLocaleDateString()}
        </Text>
      </View>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FCFFE7",
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
