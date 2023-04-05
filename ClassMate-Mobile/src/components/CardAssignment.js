import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function CardAssignment({ item, status }) {
  const navigation = useNavigation();
  function goToDetail(id) {
    navigation.navigate("Detail", { id });
  }

  return (
    <TouchableOpacity onPress={() => goToDetail(item?.Assignment._id)}>
      <View style={styles.card}>
        <View style={{ flex: 2, justifyContent:'center', alignItems:'center' }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.asignmenName}>{item?.Assignment?.name}</Text>
          </View>
          <View style={{ justifyContent: 'flex-start', alignItems:'flex-start', padding:10 }}>
            <Text style={styles.asignmenClassId}>
              {item?.Assignment?.subject}
            </Text>
          </View>
        </View>
        {status ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={styles.butonAsignem}>
              <Text style={{fontWeight:'bold', color: '#1B4965'}} >{item?.status}</Text>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={styles.butonReturned} >
            <Text style={{fontWeight:'bold', color: '#1B4965'}} >{item?.status}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#CAE9FF",
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
    marginHorizontal: 20,
    width: 350,
    height: 120,
    flexDirection: "row",
  },
  butonAsignem: {
    backgroundColor: "#ffca3a",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  butonReturned: {
    backgroundColor: "#1dd3b0",
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  asignmenName: {
    textAlign:'center',
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal:10
  },
  asignmenClassId: {
    fontSize: 14,
    color: "#666",
  },
});
